import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import style from './style.css';
import { calculate } from './calculate';
import Stepper from './stepper'

import styled from 'styled-components'

const Kortti = styled.div`
  max-width: 1100px;
  margin: 0 auto;
`

// do stuff in an async function


const Home = () => {



  return (
    <div class={style.home}>
      <Kortti style={{maxWidth: "1200px"}}>
        <h1>Lukujärkkäri</h1>
        <p style={{marginBottom: 30}}>Vertaile löytyykö sitä samaa kurssia.</p>
      </Kortti>


      <Kortti>
        <Stepper />
      </Kortti>


    </div>
  );
}

export default Home;
