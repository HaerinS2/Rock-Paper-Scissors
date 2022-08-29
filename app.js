new Vue({
  el: '#app',
    data:{
      yourChoice: null,
      comChoice: null,
      count: 3,
      winner: null,
      yourLife: 3,
      comLife: 3,
      selectable: true,
      logs:[],
      selects: [
        {name: '가위', value: 'scissors'},
        {name: '바위', value: 'rock'},
        {name: '보', value: 'paper'},
      ]
    },
    computed:{
      yourChoiceImg: function(){
          return this.yourChoice !== null ? 'images/' +  this.yourChoice + '.png' : './images/question.png'
      },
      comChoiceImg: function(){
          return this.comChoice !== null ? 'images/' +  this.comChoice + '.png' : './images/question.png'
      },
    },
    watch:{
      count: function(newVal){  
        if(newVal === 0){
        //컴퓨터 패 결정
          this.selectComChoice()
           //승패 결정
          this.whoIsWin()
          //라이프 차감
          this.lifeMinus()
          //카운트 초기화 후 선택 완료 버튼 생성
          this.count = 3
          this.selectable = true

          let log = {
            message: `You=${this.yourChoice}, Computer=${this.comChoice}`,
            winner: this.winner
          }
          this.logs.unshift(log)
        }     
      },
      yourLife: function(newVal){
        if(newVal === 0){
          setTimeout(()=>{
            Swal.fire({
              icon: 'error',
              title: '패배',
              text: '아쉬워요, 그래도 다음 번엔 더 잘 할 거예요!',
              backdrop: `rgba(255,0,0,0.2)`
            })
            this.resetGame()
          }, 500)
          
        }
      },
      comLife: function(newVal){
        if(newVal === 0){
          setTimeout(()=>{
            Swal.fire({
              icon: 'success',
              title: '승리',
              text: '대단해요! 당신이 이겼어요!',
              backdrop: `rgba(0,255,0,0.2)`
            })
            this.resetGame()
          }, 500)
        }
      }
    },
    methods:{
      startGame: function(){
        if(this.yourChoice === null){
          Swal.fire({
          text: '가위, 바위, 보 중 하나를 선택해주세요.',
          backdrop: `rgba(0,0,255,0.2)`
          })
        } else{
          //게임을 시작하고 선택 완료 버튼 숨김
          this.selectable = false
          this.comChoice = null
          let countDown = setInterval(() =>{
            this.count--
            if (this.count === 0){
              clearInterval(countDown)
            }
          }, 1000)
          
        }

      },
      resetGame: function(){
        this.yourLife = 3
        this.comLife = 3
        this.yourChoice = null
        this.comChoice = null
        this.winner = null
        this.logs = []
      },
      selectComChoice: function(){
        let number = parseInt(Math.random()*3+1)
        if(number === 1){
          this.comChoice = 'scissors';
        } else if(number === 2){
          this.comChoice = 'rock';            
        } else{
          this.comChoice = 'paper';
        }
      },
      whoIsWin: function(){
        if(this.yourChoice === 'scissors' && this.comChoice === 'paper' || this.yourChoice === 'rock' && this.comChoice === 'scissors' || this.yourChoice === 'paper' && this.comChoice === 'rock'){
          this.winner = 'you'
        }
        else if(this.comChoice === 'scissors' && this.yourChoice === 'paper' || this.comChoice === 'rock' && this.yourChoice === 'scissors' || this.comChoice === 'paper' && this.yourChoice === 'rock'){
          this.winner = 'computer'
        }
        else if(this.yourChoice === this.comChoice){
          this.winner = 'no one'
        }
      },
      lifeMinus: function(){
        if(this.winner === 'you'){
          this.comLife --
        } else if(this.winner === 'computer'){
          this.yourLife --
        }
      }
    }
})