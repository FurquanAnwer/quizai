'use client'

import { useEffect, useReducer } from "react";
import Header from "./components/Header";
import Main from "./components/Main";
import Loader from "./components/Loader";
import ErrorComponent from "./components/Error";
import StartScreen from "./components/StartScreen";
import QuestionComponent from "./components/Question";
import NextButton from "./components/NextButton";
import Progress from "./components/Progress";
import FinishScreen from "./components/FinishScreen";
import Footer from "./components/Footer";
import Timer from "./components/Timer";


const SECS_PER_QUESTION = 30;

interface Question {
  question: string;
  options: string[];
  correctOption: number;
  points: number;
}

interface State {
  questions: Question[];
  status: 'loading' | 'error' | 'ready' | 'active' | 'finished';
  index: number;
  answer: number | null;
  points: number;
  highscore: number;
  secondsRemaining: number;
}

type ActionType =
  | { type: 'dataReceived'; payload: Question[] }
  | { type: 'dataFailed' }
  | { type: 'start' }
  | { type: 'newAnswer'; payload: number }
  | { type: 'nextQuestion' }
  | { type: 'finish' }
  | { type: 'restart' }
  | { type: 'tick' };


const initialState : State = {
  questions:[],

  //'loading','error','ready','active','finished'
  status:"loading",
  index:0,
  answer:null,
  points:0,
  highscore :0,
  secondsRemaining:10,
};




function reducer(state:State,action:ActionType):State{
  switch(action.type){
    case 'dataReceived':
      return {
        ...state,
        questions:action.payload,
        status:"ready",
      }
    case 'dataFailed':
      return {
        ...state,status:'error',
      }  
    case 'start' :
      return {
        ...state,status:"active",
        secondsRemaining:state.questions.length * SECS_PER_QUESTION,
      }
    case 'newAnswer':
      const question : Question = state.questions.at(state.index)!; //used non-null assertion \\\ I am sure the index is not going out of bounds
      return {
        ...state,
        answer:action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      }
    case 'nextQuestion':
      return {
        ...state,
        index:state.index+1,
        answer:null,
      }
    case 'finish':
      return {
        ...state,
        status:"finished",
        highscore:
          state.points > state.highscore ? state.points : state.highscore,
      };
    case 'restart':
      return {
        ...initialState,questions:state.questions,status:"ready"
      }; 
    case 'tick':
      return {
        ...state,
        secondsRemaining:state.secondsRemaining-1,
        status:state.secondsRemaining === 0 ? "finished" : state.status,
      }
    default:
      throw Error(`Action unknown: ${(action as any).type}`);  
  }
}

function App() {
  
  const [{questions,status,index,answer,points,highscore,secondsRemaining},dispatch] = useReducer(reducer,initialState);

  const numQuestions = questions.length;
  const maxPossiblePoints = questions.reduce((prev,cur)=>prev + cur.points,0);

  useEffect(function(){
    fetch("/data/questions.json")
      .then((res)=>res.json())
      .then((data)=>{
        const questionsArray = data.questions;
        console.log(questionsArray);
        dispatch({type:'dataReceived',payload:questionsArray})
      })
      .catch((err)=>dispatch({type:'dataFailed'}));
  }, []);

  return (
    <div className="app">
      <Header/>
      <Main>
        {status==='loading' && <Loader/>}
        {status==='error' && <ErrorComponent/>}
        {status==='ready' && <StartScreen numQuestions={numQuestions} dispatch={dispatch} />}
        {status === 'active' && (
          <>
            <Progress index={index} numQuestions={numQuestions} points={points} maxPossiblePoints={maxPossiblePoints} answer={answer}/>
            <QuestionComponent question = {questions[index]} dispatch={dispatch} answer={answer}/>
            <Footer>
              <Timer dispatch={dispatch} secondsRemaining={secondsRemaining}/>
              <NextButton dispatch={dispatch} answer={answer} index={index} numQuestions={numQuestions}/>
            </Footer>
          </>
        )
        }
        {status==='finished' && <FinishScreen points={points} maxPossiblePoints={maxPossiblePoints} highscore={highscore} dispatch={dispatch}/>}
      </Main>
    </div>
  );
}

export default App;