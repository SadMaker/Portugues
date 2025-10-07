const textoEl = document.getElementById('texto-historia');
const opcoesEl = document.getElementById('opcoes');
const bodyEl = document.body;
let flag = false
let audio_fundo

const historia = {
    sinopse: {
        texto: "<div>Bem-vindo a <span class='font-bold'>'Uns Braços'</span>, um conto de Machado de Assis.<br><br>Você acompanhará a história de Inácio, um jovem de 15 anos que vive e trabalha na casa do rude solicitador Borges. Em meio a uma rotina de solidão e humilhações, ele desenvolve uma admiração secreta e profunda pelos braços de D. Severina, a companheira de seu patrão. Tenha uma boa experiência e boa sorte! Ah, e cuidado com as suas escolhas... elas são mais importantes do que parecem.<img src='./assets/imgs/eyes.gif' class='w-8 inline-block ml-4 -translate-y-1'></img></div>",
        styleClass: 'realidade',
        opcoes: [{ texto: "Entendi, vamos começar", target: 'inicio' }]
    },
    inicio: {
        texto: "<div>Você é <span class='font-bold'>Inácio</span>. Tem quinze anos. Um rapaz bonito, com um olhar sonhador.<br><br>Sua vida é silenciosa e monótona na casa do solicitador Borges. Hoje é mais um dia, e o jantar está servido.</div>",
        styleClass: 'realidade',
        opcoes: [{ texto: "Começar a história", target: 'jantar' }]
    },
    jantar: {
        texto: `Você está à mesa. Borges grita com você.<br><br><span class='font-bold uppercase text-[#ff9999]'>"ONDE ANDA QUE NUNCA OUVE O QUE LHE DIGO? ESTÚPIDO! MALUCO!"</span><br>Você come devagar, sem coragem de levantar os olhos do prato. À sua frente, D. Severina come em silêncio. Os braços dela, como sempre, estão à mostra.`,
        styleClass: 'realidade',
        opcoes: [
            { texto: "Continuar a olhar para o prato.", target: 'jantar_desviar' },
            { texto: "Ousar um olhar para os braços dela.", target: 'olhar_bracos' }
        ]
    },
    jantar_desviar: {
        texto: "Você se encolhe e foca no seu prato. O barulho dos talheres é o único som. O tempo parece não passar.",
        styleClass: 'realidade',
        opcoes: [{ texto: "A noite chega. Ir para o quarto.", target: 'quarto' }]
    },
    olhar_bracos: {
        texto: "<i>Você olha. Eles são bonitos e cheios. A única recompensa do seu dia era poder ver esses braços. Para você, eles eram como um refúgio.</i>",
        styleClass: 'sonho',
        opcoes: [{ texto: "A noite chega. Ir para o quarto.", target: 'quarto' }]
    },
    quarto: {
        texto: "Em seu quarto, nos fundos da casa, a solidão é sua única companhia. A janela mostra o mar e as montanhas ao longe. A vista lhe traz um sentimento confuso, vago e inquieto, uma mistura de dor e prazer, algo parecido com o que uma planta deve sentir ao criar sua primeira flor.",
        styleClass: 'sonho',
        opcoes: [
            { texto: "Pensar na saudade de casa.", target: 'quarto_saudade' },
            { texto: "Ler 'A Princesa Magalona' outra vez.", target: 'ler_livro' },
            { texto: "Deitar na rede e deixar o sono chegar...", target: 'sonho_inicio' }
        ]
    },
    quarto_saudade: {
        texto: "<i>Cinco semanas sozinho, fazendo um trabalho que não gosta, longe da sua mãe e irmãs. Você pensa em fugir, mas não consegue. Sente-se preso, acorrentado pelos braços de D. Severina.</i>",
        styleClass: 'sonho',
        opcoes: [{ texto: "Deixar o sono chegar...", target: 'sonho_inicio' }]
    },
    ler_livro: {
        texto: "<i>Você pega um dos livros que trouxe com você, o mesmo que acabou de ler. As páginas estão amareladas. Você nunca entendeu por que todas as heroínas dessas histórias antigas se parecem tanto com D. Severina, mas o fato é que parecem.</i>",
        styleClass: 'sonho',
        opcoes: [{ texto: "Deixar o sono chegar...", target: 'sonho_inicio' }]
    },
    sonho_inicio: {
        texto: "O cansaço te leva para longe...<br>Depois de um tempo, você deixa o livro cair e fica olhando para a parede. De repente, ela aparece.<br>Ela para, sorri e caminha até a sua rede. São os mesmos braços.",
        styleClass: 'sonho',
        opcoes: [{ texto: "...", target: 'sonho_beijo' }]
    },
    sonho_beijo: {
        texto: "Ela se inclina e pega suas mãos. As palavras dela são lindas e quentes, em uma língua que você não conhece, mas mesmo assim entende.<br>Ela se aproxima ainda mais e te dá um beijo na boca.<br>O primeiro. O único.",
        styleClass: 'sonho',
        opcoes: [{ texto: "Acordar", target: 'jantar_pos_sonho' }]
    },
    jantar_pos_sonho: {
        texto: "Você acorda animado. A sensação do beijo ainda está em seus lábios.<br>À mesa, porém, você a encontra quieta e séria. Um xale cobre seus braços. Você não percebe de imediato, mas vai notar depois. A confusão toma conta de você.",
        styleClass: 'realidade',
        opcoes: [
            { texto: "Ficar em silêncio e observar de longe.", target: 'observar_distancia' },
            { texto: "Tentar cruzar o olhar com o dela, com um leve sorriso.", target: 'confronto' }
        ]
    },
    observar_distancia: {
        texto: "Você não tem coragem de encará-la. Os dias passam. A voz dela não é mais tão dura, mas ela evita te olhar. O xale continua lá. A gentileza dela desapareceu.",
        styleClass: 'realidade',
        opcoes: [
            { texto: "Por que ela mudou tanto?", target: 'reflexao_solitaria' }
        ]
    },
    reflexao_solitaria: {
        texto: "De tanto pensar, você começa a achar que a culpa é sua. Talvez um olhar mais ousado, ou alguma distração que a ofendeu. Não podia ser outra coisa. Por isso ela está tão séria e continua usando o xale...",
        styleClass: 'realidade',
        opcoes: [
            { texto: "Uma semana depois...", target: 'fim_oficial' }
        ]
    },
    confronto: {
        texto: `Você a encara. Seu sorriso é uma pergunta silenciosa. D. Severina percebe, e o rosto dela se enche de medo e raiva. Ela desvia o olhar bruscamente. Borges, que não é bobo, percebe a tensão no ar.<br><br><span class='font-bold uppercase text-[#ff9999]'>"QUE OLHARES SÃO ESSES, MOLEQUE ATREVIDO?"</span>`,
        styleClass: 'realidade',
        opcoes: [
            { texto: "Ficar calado, paralisado de medo.", target: 'defesa_severina' },
            { texto: "Sussurrar 'Desculpe, senhor...'", target: 'defesa_severina' }
        ]
    },
    defesa_severina: {
        texto: "Antes que você possa reagir, D. Severina se vira para Borges, com uma falsa indignação.<br><br><i>'É o que eu te digo, Borges. Este rapaz anda com uns modos estranhos, um atrevimento... Não me sinto mais à vontade. Olhe só para ele!'</i><br>Ela mente para se proteger, sabendo que você pode ter entendido o que aconteceu com o beijo. A mentira dela decide o seu futuro.",
        styleClass: 'realidade',
        opcoes: [
            { texto: "...", target: 'fim_expulso' }
        ]
    },
    fim_expulso: {
        texto: `Borges se levanta, furioso. Ele te agarra pelo braço e te arrasta para fora.<br><br><span class='text-[#ff9999] font-bold'>"SUMA DAQUI! NÃO QUERO MAIS TE VER!".</span><br>A porta bate com força. Você está na rua, sozinho e humilhado. O sonho virou um pesadelo por causa de uma mentira que você nunca vai entender.`,
        styleClass: 'realidade',
        opcoes: [
            { texto: "...", target: 'tela_final_ruim' }
        ]
    },
    tela_final_ruim: {
        texto: "<span class='font-bold uppercase text-2xl text-[#ff9999]'>Final Ruim</span>",
        styleClass: 'realidade',
        opcoes: [
            { texto: "Recomeçar", target: 'inicio' }
        ]
    },
    fim_oficial: {
        texto: `Borges te chama. Ele diz, sem raiva, que não pode mais ficar com você.<br>Você pergunta por D. Severina, para se despedir.<br><br><span class='text-[#ff9999] font-bold'>"Ela está no quarto, com dor de cabeça"</span><br>ele responde.<br>Você sai sem entender nada. A despedida, a mudança dela, o xale. Nada.<br>Mesmo com o passar dos anos, você nunca mais sentiu nada igual àquele domingo. A lembrança daquele beijo...<br><br><i>Às vezes, você ainda pensa, sem saber que está enganado: "...Foi só um sonho! um simples sonho!"</i>`,
        styleClass: 'realidade',
        opcoes: [{ texto: "...", target: 'tela_final_bom' }]
    },
    tela_final_bom: {
        texto: "<span class='font-bold uppercase text-2xl text-[#a8d8ff]'>Final Bom</span>",
        styleClass: 'realidade',
        opcoes: [
            { texto: "Recomeçar", target: 'inicio' }
        ]
    }
};


function audio_button(){
    const audio_button = new Audio("./assets/sounds/click.mp3")
    audio_button.currentTime = 0
    audio_button.volume = 0.01
    audio_button.play()
}

function audio(){
    if (!audio_fundo){    
        audio_fundo = new Audio("./assets/sounds/music.mp3")
        audio_fundo.currentTime = 0
        audio_fundo.volume = 0.1
        audio_fundo.loop = true
    }
    audio_fundo.play().catch(() => {
        audio_block()
    })
}


function audio_block(){    
    function start(){
        console.log("Aqui inicou")
        audio_fundo.play()
        window.removeEventListener('click', start);
        window.removeEventListener('keydown', start);
        window.removeEventListener('touchstart', start);
    }

    window.addEventListener('click', start);
    window.addEventListener('keydown', start);
    window.addEventListener('touchstart', start);

}


function mostrarCena(idCena) {
    const cena = historia[idCena];

    textoEl.style.opacity = 0;
    opcoesEl.style.opacity = 0;

    setTimeout(() => {
        bodyEl.classList.remove('bg-[#3d3a37]', 'text-[#e4dcd2]', 'bg-[#4a4642]', 'text-[#d1c9bd]');
        bodyEl.classList.remove('bg-gradient-to-b', 'from-[#e6f7ff]', 'to-[#ffffff]', 'text-[#2c3e50]');

        if (cena.styleClass === 'realidade') {
            bodyEl.classList.add('bg-[#3d3a37]', 'text-[#e4dcd2]');
        } else {
            bodyEl.classList.add('bg-[#4a4642]', 'text-[#d1c9bd]');
        }
        
        textoEl.innerHTML = cena.texto;
        textoEl.style.opacity = 1;

        opcoesEl.innerHTML = '';
        cena.opcoes.forEach(opcao => {
            const btn = document.createElement('button');
            btn.style = "cursor: pointer"
            
            const baseClasses = 'opcao block p-2.5 px-4 border rounded-md transition-all duration-300 transform';
            let styleClasses;

            if (cena.styleClass === 'realidade') {
                styleClasses = ' border-[#a8d8ff] text-[#a8d8ff] hover:bg-[#a8d8ff] hover:text-[#3d3a37] hover:-translate-y-0.5';
            } else {
                styleClasses = ' border-[#c5b8a5] text-[#c5b8a5] hover:bg-[#c5b8a5] hover:text-[#4a4642] hover:-translate-y-0.5';
            }
            btn.className = baseClasses + styleClasses;
            btn.innerText = opcao.texto;
            
            btn.addEventListener('click', () => {
                audio_button()
                mostrarCena(opcao.target);
                if(opcao.target == 'inicio'){
                    if(flag){
                        audio_fundo.currentTime = 0
                    }else{
                        flag = true
                    }
                }
            });
            opcoesEl.appendChild(btn);
        });

        opcoesEl.style.opacity = 1;
    }, 600);
}

document.addEventListener('DOMContentLoaded', () => {
    mostrarCena('sinopse');
    audio()
});

