// import modules
import React, { useRef, useState, useEffect, Suspense } from 'react';
import { useLocation, useParams } from 'react-router';
import QueryString from 'qs';
import httpCommon from './utils/http-common';
// import Words from './wordBlock';
// import css
import "./css/fbx_loader.css";
import "./css/word_block.css";
// import pages
import Scene from "./fbxComponent";
import AviComponent from "./AviComponent";
import axios from 'axios';

function Words(words) {
  const ITEMS_NNP = words.for_front.nnp.map((word) => <li className='cant' key={word}>{word}</li>);
  const ITEMS_NOUN = words.for_front.noun.map((word) => {if (!((words.for_back.cant).includes(word))) { return  <li className='can' key={word}>{word}</li> }
    else { return <li className='cant' key={word}>{word}</li>}});
  const ITEMS_VERB = words.for_front.verb.map((word) => {if (!((words.for_back.cant).includes(word))) { return  <li className='can' key={word}>{word}</li> }
    else { return <li className='cant' key={word}>{word}</li>}});
  return (
        <>
            <ul className='BLOCKS_NNP'>
                <li className='BLOCKS_TITLE'>고유명사</li>
                {ITEMS_NNP}
            </ul>
            <ul className='BLOCKS_NOUN'>
                <li className='BLOCKS_TITLE'>체언</li>
                {ITEMS_NOUN}
            </ul>
            <ul className='BLOCKS_VERB'>
                <li className='BLOCKS_TITLE'>용언</li>
                {ITEMS_VERB}
            </ul>
        </>
    );
}


// Style Initializer
const box_active = { width: "758px", height: "433px", opacity: "1", borderRadius: "5px", };
const box_hidden = { width: "0px", height: "0px", opacity: "0", visibility: "hidden", };

export default function FbxLoader() {
  const params = useParams();
  const location = useLocation();


  // state initializer
  const [splash, setSplash] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [model, setModel] = useState('');

  const [loading, setLoading] = useState(false);
  const [wordsBlock, setWordsBlock] = useState('');

  useEffect(() => {
    // setLoading(false)
    const queryData = QueryString.parse(location.search, { ignoreQueryPrefix: true });
    setInputValue(queryData.st ??= inputValue);
    setSplash(!(queryData.st ??= false));
    // axios get 받아오기
    // setModel('');
    
    // console.log(`http://127.0.0.1:8000/api/translate?str=${inputValue}`)

    const promise = axios.get(`http://127.0.0.1:8000/api/translate?str=${inputValue}`)
    // const promise = axios.get(`http://127.0.0.1:8000/api/translate?str=${inputValue}`)
    .then(({data}) => {
      setLoading(true);

      setWordsBlock(Words(data));
      if (data.for_back.cant.length === 0) {
        const result = [];
        data.for_back.word.map((word) => {
          result.push(word[1]);
        })
        httpCommon.get(`/api/model?str=${result.join(', ')}`)
        .then(({data}) => setModel(data))
        .catch((err) => console.log(err))
      }

    }).catch((error) => console.log(error))


  }, [location.search, params, loading]);

  // splash img click event
  function handleClick(e) { setSplash(false); };
  // input value change event
  function onChange(e) { setInputValue( e.target.value ); };
  // button click event
  function onClick(e) {
    setLoading(false);
  };

  return (
    <> 
      {/* Splash Image Section */}
      <div className="section1" style={{zIndex: 10}}>
        <img onClick={handleClick} onDrag={handleClick} style={splash ? box_active : box_hidden} alt="splash" src="img/splash01.png" />
      </div>

      {/* FBX Viewer Section */}
      <div className="fbx_loader">
        {/* <Scene model={model} /> */}
        
        <AviComponent word={model} />;
      </div>
      

      {/* Input Box Section */}
      <div className='InputString'>
        <input type='text' placeholder='번역할 문장을 입력해주세요 👐' value={inputValue} onChange={onChange}></input>
        <button onClick={onClick}>입력</button>
      </div>

      {/* Words Block Section */}
      <div className='WordBlock'>
        {wordsBlock}
      </div>

    </>
  )
}
