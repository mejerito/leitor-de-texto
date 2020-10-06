const main = document.querySelector('main')
const buttonInsertText = document.querySelector('.btn-toggle')
const buttonRead = document.querySelector('#read')
const divTextBox = document.querySelector('.text-box')
const closeDivTextBox = document.querySelector('.close')
const selectElement = document.querySelector('select')
const textArea = document.querySelector('textarea')

const humanExpressions = [
    {img: './img/drink.jpg', text: 'Estou com sede'},
    {img: './img/angry.jpg', text: 'Estou nervoso'},
    {img: './img/food.jpg', text: 'Estou com fome'},
    {img: './img/grandma.jpg', text: 'Quero ver a vovó'},
    {img: './img/happy.jpg', text: 'Estou feliz'},
    {img: './img/home.jpg', text: 'Quero ir pra casa'},
    {img: './img/hurt.jpg', text: 'Estou machucado'},
    {img: './img/outside.jpg', text: 'Quero ir lá fora'},
    {img: './img/sad.jpg', text: 'Estou triste'},
    {img: './img/scared.jpg', text: 'Estou assustado'},
    {img: './img/school.jpg', text: 'Quero ir pra escola'},
    {img: './img/tired.jpg', text: 'Estou cansado'}
]

const utterance = new SpeechSynthesisUtterance()
const setTextMessage = text =>{
    utterance.text = text
}
const speakText = () => {
    speechSynthesis.speak(utterance)
}
const setVoice = event =>{
    utterance.voice = voices.find(voice => voice.name === event.target.value)
}
const createExpressionBox = ({img, text}) => {
    const div = document.createElement('div')
    div.classList.add('expression-box')
    div.innerHTML = `
        <img src="${img}" alt="${text}" title="${text}">
        <p class="info">${text}</p>
    `
    div.addEventListener('click', () =>{
        setTextMessage(text)
        speakText()

        div.classList.add('active')
        setTimeout(() => {
            div.classList.remove('active')
        }, 1000)
    })

    main.appendChild(div)

}
humanExpressions.forEach(createExpressionBox)

let voices = []

speechSynthesis.addEventListener('voiceschanged', () => {
    voices = speechSynthesis.getVoices()
    const googleVoice = voices.find(voice =>
         voice.name === 'Google português do Brasil')
    const microsoftVoice = voices.find(voice =>
        voice.name === 'Microsoft Maria Desktop - Portuguese(Brazil)')
        const option = document.createElement('option')

        option.value = name

        if(googleVoice && option.value === microsoftVoice.name){
            utterance.voice = googleVoice
            option.selected = true
        }else if(microsoftVoice){
            utterance.voice = microsoftVoice
            option.selected = true
        }
    voices.forEach(({name, lang}) => {
        const option = document.createElement('option')

        option.value = name
        option.textContent = `${lang} | ${name}`
        selectElement.appendChild(option)
    })
})

buttonInsertText.addEventListener('click', () => {
    divTextBox.classList.add('show')
})

closeDivTextBox.addEventListener('click', ()=>{
    divTextBox.classList.remove('show')
})
selectElement.addEventListener('change', setVoice)

buttonRead.addEventListener('click', () => {
    setTextMessage(textArea.value)
    speakText()
})