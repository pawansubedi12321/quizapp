import React, { useEffect, useState } from 'react';
import './Quizdesign.css';

const Quizdesign = () => {
  const [users, setUsers] = useState([]);
  const [randomQuestion, setRandomQuestion] = useState([]);
  const [counter,setCouter]=useState(0);
  const [selecttag,setselecttag]=useState('');
  const [clicked,setClicked]=useState(false);
  const [shuffled,setshuffled]=useState("");
  //const [wronganswer,setwronganswer]=useState(false);
  const fetchUserData = () => {
    fetch('https://the-trivia-api.com/v2/questions')
      .then(response => response.json())
      .then(data => {
        setUsers(data);
      });
  };
  useEffect(() => {
    fetchUserData();
  }, []);
  console.log(users);

  const random = () => {

    let rand = Math.floor(Math.random() * users.length - 1) + 1;
    const question = users[rand];
    setRandomQuestion(question);
    const shuffledOptions = [
      question.incorrectAnswers[0],
      question.incorrectAnswers[1],
      question.incorrectAnswers[2],
      question.correctAnswer
    ];
    const shuffled = shuffledOptions.sort(() => Math.random() - 0.5);
    for (let i = shuffledOptions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledOptions[i], shuffledOptions[j]] = [shuffledOptions[j], shuffledOptions[i]];
    }
    setshuffled(shuffledOptions);
    setClicked(false);
    //setwronganswer(false);

  };

  const answer=(value)=>{
    if(value === randomQuestion.correctAnswer)
    {
      if(!clicked)
      {
      setCouter(counter+1);
      setClicked(true);
      }
      else{
        //setwronganswer(false);
        alert("Right Answer.Move to Next Question");
      }
    }
    else
    {
      alert("wrong Answer");
      
    }
    
    
  }
  
  const handleoptionchange=(event)=>{
    const option=event.target.value;
    setselecttag(option);
    if(users.length>0){
      setClicked(false);
      const filterData=users.filter(user =>user.category === option);
      const rand=Math.floor(Math.random() * filterData.length - 1) + 1;
      const filterquestion=filterData[rand];
      setRandomQuestion(filterquestion);
      console.log(filterData);
      const shuffledOptions = [
        filterquestion.incorrectAnswers[0],
        filterquestion.incorrectAnswers[1],
        filterquestion.incorrectAnswers[2],
        filterquestion.correctAnswer
      ];
    

    }
  }
  
  return (
    <div>
      <div className="outer_border">
        <h1 className="h1">Quiz Game</h1>
        <h1 className="secondh1">score:{counter}</h1>
        <div className="box">
          <div className="category">
            <select value={selecttag} onChange={handleoptionchange}>
              <option value="history">history</option>
              <option value="society_and_culture">society_and_culture</option>
              <option value="film_and_tv">film_and_tv</option>
              <option value="arts_and_literature">arts_and_literature</option>
              <option value="music">music</option>
              <option value="food_and_drink">food_and_drink</option>
              <option value="science">science</option>
            </select>
          </div>

          <div className="questions-section">
            <p>Question</p>
            {/* <div className="wronganswer">{wronganswer?<h2>Wrong answer</h2>:<h2>Right Answer.Move to Next Question</h2>}</div> */}
            <div className="question">
              <div className="que">{randomQuestion.question && <div>{randomQuestion.question.text}</div>}</div>
            </div>
          </div>

          <div className="answers-sectioin">
            <p>Answers</p>
            <br></br>
            <div className="answer">
              <p className="answer1" onClick={()=>answer(shuffled[0])}>1. {shuffled[0]}</p>
              <p className="answer2" onClick={()=>answer(shuffled[1])}>2. {shuffled[1]}</p>
              <p className="answer3" onClick={()=>answer(shuffled[2])}>3. {shuffled[2]}</p>
              <p className="answer4" onClick={()=>answer(shuffled[3])}>4. {shuffled[3]}</p>
              <input type="button" value="Next Question" onClick={random}></input>
            </div>
          </div>
        </div>
      </div>
    
    </div>
  );
};

export default Quizdesign;
