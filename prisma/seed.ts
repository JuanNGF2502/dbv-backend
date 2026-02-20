import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  // Limpar banco de dados
  await prisma.progresso.deleteMany();
  await prisma.requisito.deleteMany();
  await prisma.desbravador.deleteMany();
  await prisma.classe.deleteMany();
  await prisma.user.deleteMany();
  await prisma.clube.deleteMany();

  // Criar clube
  const clube = await prisma.clube.create({
    data: { nome: "Clube Teste MVP" },
  });

  // Criar admin
  const senha = await bcrypt.hash("123456", 10);
  await prisma.user.create({
    data: {
      nome: "Admin Geral",
      email: "admin@dbv.com",
      senha,
      role: "ADMIN",
      clubeId: clube.id,
    },
  });

  // Definição das classes e seus requisitos (agora com título = seção, descrição = item)
  const classesData = [
    {
      nome: "Amigo",
      secoes: [
        {
          titulo: "I - Geral",
          itens: [
            "1. Ter, no mínimo, 10 anos de idade.",
            "2. Ser membro ativo do Clube de Desbravadores.",
            "3. Memorizar e explicar o Voto e a Lei do Desbravador.",
            "4. Ler o livro do Clube do livro Juvenil do ano em curso.",
            "5. Ler o livro 'Vaso de barro'.",
            "6. Participar ativamente da classe bíblica do seu clube."
          ]
        },
        {
          titulo: "II - Descoberta Espiritual",
          itens: [
            "1a. Criação: o que Deus criou em cada dia da Criação.",
            "1b. 10 pragas: quais as pragas que caíram sobre o Egito.",
            "1c. 12 Tribos: o nome de cada uma das 12 tribos de Israel.",
            "1d. 39 livros do Antigo Testamento e demonstre habilidade para encontrar qualquer um deles.",
            "2a. João 3:16",
            "2b. Efésios 6:1-3",
            "2c. II Timóteo 3:16",
            "2d. Salmo 1",
            "3. Leitura Bíblica: Gênesis e Êxodo (capítulos especificados)"
          ]
        },
        {
          titulo: "III - Servindo a Outros",
          itens: [
            "1. Dedicar duas horas ajudando alguém em sua comunidade, através de duas das seguintes atividades: a) Visitar alguém que precisa de amizade e orar com essa pessoa; b) Oferecer alimento a alguém carente; c) Participar de um projeto ecológico ou educativo.",
            "2. Escrever uma redação explicando como ser um bom cidadão no lar e na escola."
          ]
        },
        {
          titulo: "IV - Desenvolvendo Amizade",
          itens: [
            "1. Mencionar dez qualidades de um bom amigo e apresentar quatro situações diárias onde você praticou a Regra Áurea de Mateus 7:12.",
            "2. Saber cantar o Hino Nacional de seu país e conhecer sua história. Saber o nome do autor da letra e da música do hino."
          ]
        },
        {
          titulo: "V - Saúde e Aptidão Física",
          itens: [
            "1. Completar uma das seguintes especialidades: a) Natação principiante I; b) Cultura física; c) Nós e amarras; d) Segurança básica na água.",
            "2a. Explicar os princípios de temperança que ele defendeu ou participar em uma apresentação ou encenação sobre Daniel 1.",
            "2b. Memorizar e explicar Daniel 1:8.",
            "2c. Escrever seu compromisso pessoal de seguir um estilo de vida saudável.",
            "3. Aprender os princípios de uma dieta saudável e ajudar a preparar um quadro com os grupos básicos de alimentos."
          ]
        },
        {
          titulo: "VI - Organização e Liderança",
          itens: [
            "1. Através da observação, acompanhar todo o processo de planejamento até a execução de uma caminhada de 5 quilômetros."
          ]
        },
        {
          titulo: "VII - Estudo da Natureza",
          itens: [
            "1. Completar uma das seguintes especialidades: a) Felinos; b) Cães; c) Mamíferos; d) Sementes; e) Aves de Estimação.",
            "2. Aprender e demonstrar uma maneira para purificar a água e escrever um parágrafo destacando o significado de Jesus como a água da vida.",
            "3. Aprender e montar uma barraca em local apropriado."
          ]
        },
        {
          titulo: "VIII - Arte de Acampar",
          itens: [
            "1. Demonstrar como cuidar corretamente de uma corda. Fazer e explicar o uso prático dos seguintes nós: simples, cego, direito, cirurgião, lais de guia, lais de guia duplo, escota, catau, pescador, fateixa, volta da fiel, nó de gancho, volta da ribeira, ordinário.",
            "2. Completar a especialidade de Acampamento I.",
            "3. Apresentar 10 regras para uma caminhada e explicar o que fazer quando estiver perdido.",
            "4. Aprender os sinais para seguir uma pista. Preparar e seguir uma pista de no mínimo 10 sinais, que também possa ser seguida por outros."
          ]
        },
        {
          titulo: "IX - Estilo de Vida",
          itens: [
            "1. Completar uma especialidade na área de Artes e Habilidades Manuais."
          ]
        },
        {
          titulo: "Amigo da Natureza",
          itens: [
        "1. Memorizar, cantar ou tocar o Hino dos Desbravadores e conhecer a história do hino.",
            "2. Em consulta com o seu líder, escolher um dos seguintes personagens do Antigo Testamento e conversar com seu grupo sobre o amor e cuidado de Deus e o livramento demonstrado na vida do personagem escolhido: José, Jonas, Ester, Rute.",
            "3. Levar pelo menos dois amigos não adventistas à Escola Sabatina ou ao Clube de Desbravadores.",
            "4. Conhecer os princípios de higiene, de boas maneiras à mesa e como se comportar diante de pessoas que tenham diferentes idades. Demonstrar e explicar como essas boas maneiras podem ser úteis nas reuniões e acampamentos do clube.",
            "5. Fazer a especialidade de Arte de acampar.",
            "6. Conhecer e identificar 10 flores silvestres e 10 insetos de sua região.",
            "7. Começar uma fogueira com apenas um fósforo, usando materiais naturais, e mantê-la acesa.",
            "8. Usar corretamente uma faca, facão e uma machadinha e conhecer dez regras para usá-los com segurança.",
            "9. Escolher e completar uma especialidade em uma das áreas abaixo: a) Atividades missionárias; b) Atividades agrícolas."
          
          ]
        }
      ]
    },
    {
      nome: "Companheiro",
      secoes: [
        {
          titulo: "I - Geral",
          itens: [
            "1. Ter, no mínimo, 11 anos de idade.",
            "2. Ser membro ativo do Clube de Desbravadores.",
            "3. Ilustrar de forma criativa o significado do Voto dos Desbravadores.",
            "4. Ler o livro do Clube do Livro Juvenil do ano em curso e escrever um parágrafo sobre o que mais lhe chamou a atenção ou considerou importante.",
            "5. Ler o livro 'Um simples lanche'.",
            "6. Participar ativamente da classe bíblica do seu clube."
          ]
        },
        {
          titulo: "II - Descoberta Espiritual",
          itens: [
            "1a. 10 Mandamentos: A Lei de Deus dada a Moisés.",
            "1b. 27 livros do Novo Testamento e demonstrar habilidade para encontrar qualquer um deles.",
            "2a. Isaías 41:9-10",
            "2b. Hebreus 13:5",
            "2c. Provérbios 22:6",
            "2d. I João 1:9",
            "2e. Salmo 8",
            "3. Leitura Bíblica: Levítico, Números, Deuteronômio, Josué, Juízes, Rute, 1 Samuel, 2 Samuel (capítulos especificados)",
            "4. Escolher um tema: uma parábola de Jesus, um milagre de Jesus, o sermão da montanha, ou um sermão sobre a Segunda Vinda de Cristo. Demonstrar conhecimento através de troca de ideias, atividade ou redação."
          ]
        },
        {
          titulo: "III - Servindo a Outros",
          itens: [
            "1. Planejar e dedicar pelo menos duas horas servindo sua comunidade e demonstrando companheirismo para alguém, de maneira prática.",
            "2. Dedicar pelo menos cinco horas participando de um projeto que beneficiará sua comunidade ou igreja."
          ]
        },
        {
          titulo: "IV - Desenvolvendo Amizade",
          itens: [
            "1. Conversar com seu conselheiro ou unidade sobre como respeitar pessoas de diferentes culturas, raça e sexo."
          ]
        },
        {
          titulo: "V - Saúde e Aptidão Física",
          itens: [
            "1. Memorizar e explicar I Coríntios 9:24-27.",
            "2. Conversar com seu líder sobre a aptidão física e os exercícios físicos regulares que se relacionam com uma vida saudável.",
            "3. Aprender sobre os prejuízos que o cigarro causa à saúde e escrever seu compromisso de não fazer uso do fumo.",
            "4. Completar uma das seguintes especialidades: a) Natação Principiante II; b) Acampamento II."
          ]
        },
        {
          titulo: "VI - Organização e Liderança",
          itens: [
            "1. Dirigir ou colaborar em uma meditação criativa para a sua unidade ou Clube.",
            "2. Ajudar no planejamento de uma excursão ou acampamento com sua unidade ou clube, envolvendo pelo menos um pernoite."
          ]
        },
        {
          titulo: "VII - Estudo da Natureza",
          itens: [
            "1. Participar de jogos da natureza, ou caminhada ecológica em meio a natureza, pelo período de uma hora.",
            "2. Completar duas das seguintes especialidades: a) Anfíbios; b) Aves; c) Aves domésticas; d) Pecuária; e) Répteis; f) Moluscos; g) Árvores; h) Arbustos.",
            "3. Recapitular o estudo da criação e fazer um diário por sete dias registrando suas observações do que foi criado em cada dia correspondente."
          ]
        },
        {
          titulo: "VIII - Arte de Acampar",
          itens: [
            "1. Descobrir os pontos cardeais sem a ajuda de uma bússola e desenhar uma Rosa dos Ventos.",
            "2. Participar em um acampamento de final de semana, e fazer um relatório destacando o que mais lhe impressionou positivamente.",
            "3. Aprender ou recapitular os seguintes nós: a) Oito; b) Volta do salteador; c) Duplo; d) Caminhoneiro; e) Direito; f) Volta do fiel; g) Escota; h) Lais de guia; i) Simples."
          ]
        },
        {
          titulo: "IX - Estilo de Vida",
          itens: [
            "1. Completar uma especialidade não realizada anteriormente na seção de Artes e Habilidades Manuais."
          ]
        },
        {
          titulo: "Companheiro de Excursionismo",
          itens: [
            "1. Aprender e demonstrar a composição, significado e uso correto da Bandeira Nacional.",
            "2. Ler a primeira visão de Ellen White e discutir como Deus usa os profetas para apresentar Sua mensagem à igreja (ver 'Primeiros Escritos', pág. 13-20).",
            "3. Participar de uma atividade missionária ou comunitária, envolvendo também um amigo.",
            "4. Conversar com seu conselheiro ou unidade sobre como demonstrar respeito pelos seus pais ou responsáveis e fazer uma lista mostrando como cuidam de você.",
            "5. Participar de uma caminhada de 6 quilômetros preparando ao final um relatório de uma página.",
            "6. Escolher um dos seguintes itens: a) Assistir a um 'curso como deixar de fumar'; b) Assistir a dois filmes sobre saúde; c) Elaborar um cartaz sobre o prejuízo das drogas; d) Ajudar a preparar material para uma exposição ou passeata sobre saúde; e) Pesquisar na internet informações sobre saúde e escrever uma página sobre os resultados encontrados.",
            "7. Identificar e descrever 12 aves nativas e 12 árvores nativas.",
            "8. Participar de uma das seguintes cerimônias e sugerir ideias criativas de como realiza-las: a) Investidura; b) Admissão de lenço; c) Dia do desbravador.",
            "9. Preparar uma refeição em uma fogueira durante um acampamento de clube ou unidade.",
            "10. Preparar um quadro com 15 nós diferentes.",
            "11. Completar a especialidade de Excursionismo pedestre com mochila.",
            "12. Completar uma especialidade não realizada anteriormente: a) Habilidades Domésticas; b) Ciência e Saúde; c) Atividades Missionárias; d) Atividades Agrícolas."
          ]
        }
      ]
    },
    
    {
      nome: "Pesquisador",
      secoes: [
        {
          titulo: "I - Geral",
          itens: [
            "1. Ter, no mínimo, 12 anos de idade.",
            "2. Ser membro ativo do Clube de Desbravadores.",
            "3. Demonstrar sua compreensão do significado da Lei do Desbravador através de uma das seguintes atividades: a) Representação; b) Debate; c) Redação.",
            "4. Ler o livro do Clube do Livro Juvenil do ano e escrever dois parágrafos sobre o que mais lhe chamou a atenção ou considerou importante.",
            "5. Ler o livro 'Além da Magia'.",
            "6. Participar ativamente da classe bíblica do seu clube."
          ]
        },
        {
          titulo: "II - Descoberta Espiritual",
          itens: [
            "1. Levítico 11: quais as regras para os alimentos considerados comestíveis e não comestíveis.",
            "2a. Eclesiastes 12:13-14",
            "2b. Romanos 6:23",
            "2c. Apocalipse 1:3",
            "2d. Isaías 43:1-2",
            "2e. Salmo 51:10",
            "2f. Salmo 16",
            "3. Leitura Bíblica: 1 Reis, 2 Reis, 2 Crônicas, Esdras, Neemias, Ester, Jó, Salmos, Provérbios, Eclesiastes (capítulos especificados)",
            "4. Escolher uma das histórias: a) João 3 (Nicodemos); b) João 4 (mulher samaritana); c) Lucas 10 (bom samaritano); d) Lucas 15 (filho pródigo); e) Lucas 19 (Zaqueu). Demonstrar compreensão de como Jesus salva as pessoas através de conversa, apresentação, cartazes, poesia."
          ]
        },
        {
          titulo: "III - Servindo a Outros",
          itens: [
            "1. Conhecer os projetos comunitários desenvolvidos em sua cidade e participar em pelo menos um deles com sua unidade ou clube.",
            "2. Participar em três atividades missionárias da igreja."
          ]
        },
        {
          titulo: "IV - Desenvolvendo Amizade",
          itens: [
            "1. Participar de um debate ou representação sobre a pressão de grupo e identificar a influência que isso exerce sobre suas decisões.",
            "2. Visitar um órgão público de sua cidade e descobrir de que maneiras o clube pode ser útil à sua comunidade."
          ]
        },
        {
          titulo: "V - Saúde e Aptidão Física",
          itens: [
            "1. Escolher uma das atividades abaixo e escrever um texto pessoal para um estilo de vida livre do álcool: a) Participar de uma discussão em classe sobre os efeitos do álcool no organismo; b) Assistir a um vídeo sobre o álcool ou outras drogas no corpo humano e conversar sobre o assunto."
          ]
        },
        {
          titulo: "VI - Organização e Liderança",
          itens: [
            "1. Dirigir uma cerimônia de abertura da reunião semanal em seu clube ou um programa de Escola Sabatina.",
            "2. Ajudar a organizar a classe bíblica de seu clube."
          ]
        },
        {
          titulo: "VII - Estudo da Natureza",
          itens: [
            "1. Identificar a estrela Alfa da constelação do Centauro e a constelação de Órion. Conhecer o significado espiritual de Órion, como descrito no livro 'Primeiros Escritos', de Ellen White, pág. 41.",
            "2. Completar uma das especialidades abaixo: a) Astronomia; b) Cactos; c) Climatologia; d) Flores; e) Rastreio de animais."
          ]
        },
        {
          titulo: "VIII - Arte de Acampar",
          itens: [
            "1. Apresentar seis segredos para um bom acampamento. Participar de um acampamento de final de semana, planejando e cozinhando duas refeições.",
            "2. Completar as seguintes especialidades: a) Acampamento III; b) Primeiros Socorros - básico.",
            "3. Aprender a usar uma bússola ou GPS (urbano ou campo), e demonstrar sua habilidade encontrando endereços em uma zona urbana."
          ]
        },
        {
          titulo: "IX - Estilo de Vida",
          itens: [
            "1. Completar uma especialidade não realizada anteriormente, em Artes e Habilidades Manuais."
          ]
        },
        {
          titulo: "Pesquisador de Campo e Bosque",
          itens: [
            "1. Conhecer e saber usar de forma adequada a Bandeira dos Desbravadores, o bandeirim de unidade e os comandos de ordem unida.",
            "2. Ler a história de J. N. Andrews ou um pioneiro de seu país e discutir a importância do trabalho de missionários, e porque Cristo ordenou a Grande Comissão (Mateus 28:18-20).",
            "3. Convidar uma pessoa para assistir um dos seguintes programas: a) Clube dos Desbravadores; b) Classe Bíblica; c) Pequeno Grupo.",
            "4. Fazer uma das seguintes especialidades: a) Asseio e Cortesia Cristã; b) Vida Familiar.",
            "5. Participar de uma caminhada de 10 quilômetros e fazer uma lista dos equipamentos necessários, incluindo a roupa e o calçado que devem ser usados.",
            "6. Participar na organização de um dos eventos especiais do Clube: a) Investidura; b) Admissão de Lenço; c) Dia do Desbravador.",
            "7. Identificar seis pegadas de animais ou aves. Fazer um modelo em gesso, massa de modelar ou biscuit de três dessas pegadas.",
            "8. Aprender a fazer quatro amarras básicas e construir um móvel de acampamento.",
            "9. Planejar um cardápio vegetariano para sua unidade, para um acampamento de três dias e apresentar para seu instrutor.",
            "10. Enviar e receber uma mensagem através das formas de comunicação abaixo: a) Alfabeto com semáforos; b) Código Morse, com lanterna; c) Alfabeto LIBRAS; d) Alfabeto Braile.",
            "11. Completar duas especialidades não realizadas anteriormente, em uma das áreas abaixo: a) Habilidades Domésticas; b) Ciência e Saúde; c) Atividades Missionárias; d) Atividades Agrícolas."
          ]
        }
      ]
    },
    {
  nome: "Pioneiro",
  secoes: [
    {
      titulo: "I - Geral",
      itens: [
        "1. Ter, no mínimo, 13 anos de idade.",
        "2. Ser membro ativo do Clube de Desbravadores.",
        "3. Memorizar e entender o Alvo e o Lema JA.",
        "4. Ler o livro do Clube do Livro Juvenil do ano em curso e resumi-lo em uma página.",
        "5. Ler o livro 'Expedição Galápagos'."
      ]
    },
    {
      titulo: "II - Descoberta Espiritual",
      itens: [
        "1a. Bem-Aventuranças: O sermão da Montanha.",
        "2a. Isaías 26:3",
        "2b. Romanos 12:12",
        "2c. João 14:1-3",
        "2d. Salmo 37:5",
        "2e. Filipenses 3:12-14",
        "2f. Salmo 23",
        "2g. I Samuel 15:22",
        "3. Conversar em seu clube ou unidade sobre: a) O que é o cristianismo; b) Quais são as características de um verdadeiro discípulo; c) O que fazer para ser um cristão verdadeiro.",
        "4. Participar de um estudo especial sobre a inspiração da Bíblia, com a ajuda de um pastor, trabalhando os conceitos de inspiração, revelação e iluminação.",
        "5. Convidar três ou mais pessoas para assistirem uma classe bíblica ou pequeno grupo.",
        "6. Leitura bíblica: Eclesiastes 3,5,7,11,12; Isaías 5,11,26:1-12,35,40,43,52:13-15,53,58,60,61; Jeremias 9:23-26,10:1-16,18:1-6,26,36,52:1-11; Daniel 1-12; Joel 2:12-31; Amós 7:10-16,8:4-11; Jonas 1-4; Miqueias 4; Ageu 2; Zacarias 4; Malaquias 3-4; Mateus 1-23."
      ]
    },
    {
      titulo: "III - Servindo a Outros",
      itens: [
        "1. Participar em dois projetos missionários definidos por seu clube.",
        "2. Trabalhar em um projeto comunitário de sua igreja, escola ou comunidade."
      ]
    },
    {
      titulo: "IV - Desenvolvendo Amizade",
      itens: [
        "1. Participar de um debate e fazer uma avaliação pessoal sobre suas atitudes em dois dos seguintes temas: a) Auto-estima; b) Amizade; c) Relacionamentos; d) Otimismo e pessimismo."
      ]
    },
    {
      titulo: "V - Saúde e Aptidão Física",
      itens: [
        "1. Preparar um programa pessoal de exercícios físicos diários e conversar com seu líder ou conselheiro sobre os princípios de aptidão física. Fazer e assinar um compromisso pessoal de realizar exercícios físicos regularmente.",
        "2. Discutir as vantagens do estilo de vida Adventista de acordo com o que a Bíblia ensina."
      ]
    },
    {
      titulo: "VI - Organização e Liderança",
      itens: [
        "1. Assistir a um seminário ou treinamento, oferecido pela sua igreja ou distrito nos departamentos abaixo: a) Ministério Pessoal; b) Evangelismo.",
        "2. Participar de uma atividade social de sua igreja."
      ]
    },
    {
      titulo: "VII - Estudo da Natureza",
      itens: [
        "1. Estudar a história do dilúvio e o processo de fossilização.",
        "2. Completar uma especialidade, não realizada anteriormente, em Estudos da Natureza."
      ]
    },
    {
      titulo: "VIII - Arte de Acampar",
      itens: [
        "1. Fazer um fogo refletor e demonstrar seu uso.",
        "2. Participar de um acampamento de final de semana, arrumando de forma apropriada sua bolsa ou mochila com o equipamento pessoal necessário.",
        "3. Completar a especialidade de Resgate básico."
      ]
    },
    {
      titulo: "IX - Estilo de Vida",
      itens: [
        "1. Completar uma especialidade não realizada anteriormente em uma das seguintes áreas: a) Atividades Missionárias; b) Atividades Profissionais; c) Atividades Agrícolas."
      ]
    },
    {
      titulo: "Pioneiro de Novas Fronteiras",
      itens: [
        "1. Completar a especialidade de Cidadania Cristã, caso não tenha sido realizada anteriormente.",
        "2. Encenar a história do bom samaritano, demonstrando como ajudar as pessoas e auxiliar de forma prática três pessoas ou mais.",
        "3. Participar em uma das seguintes atividades, apresentando ao final um relatório escrito contendo, no mínimo, duas páginas: a) Caminhar 10 quilômetros; b) Cavalgar 2 quilômetros; c) Viajar de canoa durante 2 horas; d) Praticar 15 quilômetros de ciclismo; e) Nadar 200 metros; f) Correr 1500 metros; g) Rodar 2 Km de patins ou roller.",
        "4. Completar a especialidade de Mapa e bússola.",
        "5. Demonstrar habilidade no uso correto de uma machadinha.",
        "6. Ser capaz de acender uma fogueira num dia de chuva, saber como conseguir lenha seca e manter o fogo aceso.",
        "7. Completar um dos seguintes itens: a) Pesquisar e identificar dez variedades de plantas comestíveis; b) Ser capaz de enviar e receber 35 letras por minuto pelo código semafórico; c) Ser capaz de enviar e receber 35 letras por minuto através do código náutico, usando o código internacional; d) Ser capaz de apresentar e entender Mateus 24 em LIBRAS (linguagem de sinais); e) Preparar o Salmo 23 em Braile.",
        "8. Completar uma especialidade, não realizada anteriormente, em Atividades Recreativas.",
        "9. Pesquisar e identificar, através de fotografia, exposição ou ao vivo, um dos seguintes itens: a) 25 folhas de árvores; b) 25 rochas e minerais; c) 25 flores silvestres; d) 25 borboletas e mariposas; e) 25 conchas.",
        "10. Completar a especialidade de Fogueiras e cozinha ao ar livre."
      ]
    }
  ]
},

{
  nome: "Excursionista",
  secoes: [
    {
      titulo: "I - Geral",
      itens: [
        "1. Ter, no mínimo, 14 anos de idade.",
        "2. Ser membro ativo do Clube de Desbravadores.",
        "3. Memorizar e explicar o significado do Objetivo JA.",
        "4. Ler o livro do Clube do Livro Juvenil do ano em curso e resumi-lo em uma página.",
        "5. Ler o livro 'O Fim do Começo'."
      ]
    },
    {
      titulo: "II - Descoberta Espiritual",
      itens: [
        "1a. 12 Apóstolos: O nome dos 12 apóstolos de Cristo.",
        "1b. Frutos do Espírito: A relação dos adjetivos do caráter do cristão.",
        "2a. Romanos 8:28",
        "2b. Apocalipse 21:1-3",
        "2c. II Pedro 1:20-21",
        "2d. I João 2:14",
        "2e. II Crônicas 20:20",
        "2f. Salmo 46",
        "3. Estudar e entender a pessoa do Espírito Santo, como Ele se relaciona, e qual o Seu papel no crescimento espiritual de cada ser humano.",
        "4. Estude, com sua unidade, os eventos finais e a segunda vinda de Cristo.",
        "5. Através do estudo da Bíblia, descobrir o verdadeiro significado da observância do sábado.",
        "6. Leitura bíblica: Mateus 24-28; Marcos 7,9-12,16; Lucas 1:4-25,1:26-66,2:21-38,2:39-52,7:18-28,8,10:1-37,10:38-42,11:1-13,12-19,21-24; João 1-6,8:1-38,9-15,17-21; Atos 1-8."
      ]
    },
    {
      titulo: "III - Servindo a Outros",
      itens: [
        "1. Convidar um amigo para participar de uma atividade social de sua igreja ou da Associação/Missão.",
        "2. Participar de um projeto comunitário desde o planejamento, organização até a execução.",
        "3. Discutir como os jovens adventistas devem se relacionar com as pessoas nas diferentes situações do dia a dia, tais como: a) Vizinhos; b) Escola; c) Atividades sociais; d) Atividades recreativas."
      ]
    },
    {
      titulo: "IV - Desenvolvendo Amizade",
      itens: [
        "1. Através de uma conversa em grupo ou avaliação pessoal, examinar suas atitudes em dois dos seguintes temas: a) Auto-estima; b) Relacionamento familiar; c) Finanças pessoais; d) Pressão de grupo.",
        "2. Preparar uma lista contendo cinco sugestões de atividades recreativas para ajudar pessoas com necessidades específicas e colaborar na organização de uma dessas atividades para essas pessoas."
      ]
    },
    {
      titulo: "V - Saúde e Aptidão Física",
      itens: [
        "1. Completar a especialidade de Temperança."
      ]
    },
    {
      titulo: "VI - Organização e Liderança",
      itens: [
        "1. Preparar um organograma da igreja local e relacionar as funções dos departamentos.",
        "2. Participar em dois programas envolvendo diferentes departamentos da igreja local.",
        "3. Completar a especialidade de Aventuras com Cristo."
      ]
    },
    {
      titulo: "VII - Estudo da Natureza",
      itens: [
        "1. Recapitular a historia de Nicodemos e relacioná-la com o ciclo de vida da lagarta ou borboleta, acrescentando um significado espiritual.",
        "2. Completar uma especialidade de Estudos da Natureza, não realizada anteriormente."
      ]
    },
    {
      titulo: "VIII - Arte de Acampar",
      itens: [
        "1. Com um grupo de, no mínimo quatro pessoas e com a presença de um conselheiro adulto e experiente, andar pelo menos 20 quilômetros numa área rural ou deserta, incluindo uma noite ao ar livre ou em barraca. Planejar a expedição em detalhes antes da saída. Durante a caminhada, efetuar anotações sobre o terreno, flora e fauna observados. Depois, usando as anotações, participar em uma discussão de grupo, dirigida por seu conselheiro.",
        "2. Completar a especialidade de Pioneirias."
      ]
    },
    {
      titulo: "IX - Estilo de Vida",
      itens: [
        "1. Completar uma especialidade, não realizada anteriormente, em uma das seguintes áreas: a) Atividades missionárias; b) Atividades agrícolas; c) Ciência e saúde; d) Habilidades domésticas."
      ]
    },
    {
      titulo: "Excursionista na Mata",
      itens: [
        "1. Fazer uma apresentação escrita ou falada sobre o respeito que devemos ter com a Lei de Deus e as autoridades civis, enumerando pelo menos 10 princípios de comportamento moral.",
        "2. Acompanhar seu pastor ou ancião em uma visita missionária ou estudo bíblico.",
        "3. Completar a especialidade de Testemunho Juvenil.",
        "4. Apresentar cinco atividades na natureza, para serem realizadas no Sábado à tarde.",
        "5. Com sua unidade, construir cinco móveis de acampamento e um portal para o clube.",
        "6. Através da supervisão de seu líder ou conselheiro, conversar em sua unidade ou clube sobre um dos seguintes temas: a) Modéstia cristã; b) Recreação; c) Saúde; d) Observância do sábado.",
        "7. Demonstrar conhecimento para encontrar alimentos, através de plantas silvestres de sua região e saber diferenciá-las de plantas tóxicas/venenosas.",
        "8. Demonstrar conhecimento quanto aos procedimentos necessários em caso de ferimentos por diferentes animais peçonhentos e não peçonhentos.",
        "9. Demonstrar técnicas para percorrer trilhas em diferentes tipos de terrenos, como: desertos, florestas, pântanos e rios.",
        "10. Completar a especialidade de Vida Silvestre.",
        "11. Completar a especialidade de Ordem Unida, caso não tenha sido realizada anteriormente."
      ]
    }
  ]
},

{
  nome: "Guia",
  secoes: [
    {
      titulo: "I - Geral",
      itens: [
        "1. Ter, no mínimo, 15 anos de idade.",
        "2. Ser membro ativo do clube de Desbravadores.",
        "3. Memorizar e explicar o Voto de Fidelidade à Bíblia.",
        "4. Ler o livro do Clube de Leitura Juvenil do ano em curso e resumi-lo em uma página.",
        "5. Ler o livro 'O livro amargo'."
      ]
    },
    {
      titulo: "II - Descoberta Espiritual",
      itens: [
        "1a. 3 mensagens Angélicas: Reveladas em Apocalipse 14:6-12.",
        "1b. 7 Igrejas: O nome das igrejas do Apocalipse.",
        "1c. Pedras Preciosas: Os 12 fundamentos da Cidade Santa - A Nova Jerusalém.",
        "2a. I Coríntios 13",
        "2b. II Crônicas 7:14",
        "2c. Apocalipse 22:18-20",
        "2d. II Timóteo 4:6-7",
        "2e. Romanos 8:38-39",
        "2f. Mateus 6:33-34",
        "3. Descrever os dons espirituais mencionados nos escritos de Paulo (Coríntios, Efésios, Filipenses) e para quais objetivos a igreja recebe estes dons.",
        "4. Estudar a estrutura e serviço do santuário no Antigo Testamento e relacionar com o ministério pessoal de Jesus e a cruz.",
        "5. Ler e resumir três histórias de pioneiros adventistas. Contar essas histórias na reunião do clube, no culto JA ou na Escola Sabatina.",
        "6. Leitura bíblica: Atos 9-28; Romanos 12-14; 1 Coríntios 13; 2 Coríntios 5:11-21,11:16-33,12:1-10; Gálatas 5:16-26,6:1-10; Efésios 5:1-21,6; Filipenses 4; Colossenses 3; 1 Tessalonicenses 4:13-18,5; 2 Tessalonicenses 2-3; 1 Timóteo 4:6-16,5:1-16,6:11-21; 2 Timóteo 2-3; Filemom; Hebreus 11; Tiago 1,3,5:7-20; 1 Pedro 1,5:1-11; 2 Pedro 3; 1 João 2-5; Judas 1:17-25; Apocalipse 1-3,7:9-17,12-14,19-21."
      ]
    },
    {
      titulo: "III - Servindo a Outros",
      itens: [
        "1. Ajudar a organizar e participar em uma das seguintes atividades: a) Fazer uma visita de cortesia a uma pessoa doente; b) Adotar uma pessoa ou família em necessidade e ajudá-los; c) Um projeto de sua escolha aprovado por seu líder.",
        "2. Discutir com sua unidade os métodos de evangelismo pessoal e colocar alguns princípios em prática."
      ]
    },
    {
      titulo: "IV - Desenvolvendo Amizade",
      itens: [
        "1. Assistir a uma palestra ou aula e examinar suas atitudes em relação a dois dos seguintes temas: a) A Importância da escolha profissional; b) Como se relacionar com os pais; c) A escolha da pessoa certa para namorar; d) O plano de Deus para o sexo."
      ]
    },
    {
      titulo: "V - Saúde e Aptidão Física",
      itens: [
        "1. Fazer uma apresentação, para alunos do ensino fundamental, sobre os oito remédios naturais dados por Deus.",
        "2. Completar uma das seguintes atividades: a) Escrever uma poesia ou artigo sobre saúde para ser divulgado em uma revista, boletim ou jornal da igreja; b) Individualmente ou em grupo, organizar e participar em uma corrida ou atividade similar e apresentar com antecedência um programa de treinamento físico para este evento; c) Ler as páginas 102-125 do livro 'Temperança', de Ellen White, e apresentar em uma página ou mais, 10 textos selecionados da leitura; d) Completar a especialidade de Nutrição ou liderar um grupo para a especialidade de Cultura física."
      ]
    },
    {
      titulo: "VI - Organização e Liderança",
      itens: [
        "1. Preparar um organograma da estrutura administrativa da Igreja Adventista em sua Divisão.",
        "2. Participar em um dos itens abaixo: a) Curso para conselheiros; b) Convenção de liderança da Associação/Missão; c) 2 reuniões de diretoria de seu clube.",
        "3. Planejar e ensinar, no mínimo, dois requisitos de uma especialidade para um grupo de desbravadores."
      ]
    },
    {
      titulo: "VII - Estudo da Natureza",
      itens: [
        "1. Ler o capítulo 7 do livro 'O Desejado de Todas as Nações' sobre a infância de Jesus. Apresentar para um grupo, clube ou unidade as lições encontradas, demonstrando a importância que o estudo da natureza exerceu na educação e no ministério de Jesus.",
        "2. Completar uma das seguintes especialidades: a) Ecologia; b) Conservação Ambiental."
      ]
    },
    {
      titulo: "VIII - Arte de Acampar",
      itens: [
        "1. Participar com sua unidade de um acampamento com estrutura de pioneiria, planejar o que deve ser levado e o que vai acontecer neste acampamento.",
        "2. Planejar, preparar e cozinhar três refeições ao ar livre.",
        "3. Construir e utilizar um móvel de acampamento em tamanho real, com nós e amarras.",
        "4. Completar uma especialidade, não realizada anteriormente, que possa ser contada para um dos Mestrados abaixo: a) Aquática; b) Esportes; c) Atividades Recreativas; d) Vida Campestre."
      ]
    },
    {
      titulo: "IX - Estilo de Vida",
      itens: [
        "1. Completar uma especialidade, não realizada anteriormente, em alguma das seguintes áreas: a) Atividades agrícolas; b) Ciência e saúde; c) Habilidades domésticas; d) Atividades profissionais."
      ]
    },
    {
      titulo: "Guia de Exploração",
      itens: [
        "1. Completar a especialidade de Mordomia.",
        "2. Ler o livro 'O maior discurso de Cristo' e escrever uma página sobre o efeito da leitura em sua vida.",
        "3. Cumprir um dos seguintes itens: a) Trazer dois amigos para assistir a duas diferentes reuniões da igreja; b) Ajudar a planejar e participar de, no mínimo, quatro domingos em uma série de evangelismo jovem.",
        "4. Escrever uma página ou apresentar uma palestra sobre como influenciar amigos para Cristo.",
        "5. Observar durante o período de dois meses o trabalho dos diáconos, apresentando um relatório detalhado de suas atividades, contendo: a) Cuidado da propriedade da igreja; b) Cerimônia de lava-pés; c) Cerimônia de batismo; d) Recolhimento dos dízimos e ofertas.",
        "6. Completar o mestrado em Vida Campestre.",
        "7. Projetar três tipos diferentes de abrigo, explicar seu uso e utilizar um deles em um acampamento.",
        "8. Assistir um seminário ou apresentar uma palestra sobre dois dos seguintes temas: a) Aborto; b) AIDS; c) Violência; d) Drogas.",
        "9. Completar a especialidade de Orçamento familiar.",
        "10. Completar a especialidade de Liderança campestre."
      ]
    }
  ]
},

  ];

  // Criar as classes e seus requisitos
  for (const classeData of classesData) {
    const classe = await prisma.classe.create({
      data: {
        nome: classeData.nome,
        clubeId: clube.id,
      },
    });

    for (const secao of classeData.secoes) {
      for (const item of secao.itens) {
        await prisma.requisito.create({
          data: {
            titulo: secao.titulo,    // Título = seção
            descricao: item,          // Descrição = item numerado
            classeId: classe.id,
          },
        });
      }
    }
  }

  console.log("🌱 Seed executado com sucesso! Classes e requisitos criados.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });