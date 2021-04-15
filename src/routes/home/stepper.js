import { h } from 'preact';
import  'preact/debug';
import { useState, useEffect } from 'preact/hooks';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { calculate } from './calculate';

import One from '../../assets/1.png';
import Two from '../../assets/2.png';


const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  actionsContainer: {
    marginBottom: theme.spacing(2),
  },
  resetContainer: {
    padding: theme.spacing(3),
  },
}));

function getSteps() {
  return ['Valitaan lukujärjestykset', 'Ladataan', 'Nautitaan'];
}

function getStepContent(step, info, state, setState) {

  switch (step) {
    case 0:
      return (
        <>
        {info && <p>{info}</p>}
          <TextField
            label="Eka linkki"
            size="small"
            defaultValue=""
            fullWidth
            value={state.first}
            onChange={e => setState({...state, first: e.target.value})}
            variant="outlined"
          />

          <TextField
            label="Toka linkki"
            style={{marginTop: 10}}
            size="small"
            defaultValue=""
            fullWidth
            value={state.second}
            onChange={e => setState({...state, second: e.target.value})}
            variant="outlined"
          />
        </>
      )
    case 1:
      return 'Varastamme dataa wilmasta';
    case 2:
      return `Nautimme`;
    case 3:
      return (
        <div>
          <h3>Kopioi oma linkki näin ylempään</h3>
          <img style={{width: '100%'}} src={One} />
          <img style={{width: '100%'}} src={Two} />
          <h3>Ja laita kaverin oma linkki alempaan</h3>
        </div>
      );
    default:
      return 'Unknown step';
  }
}

export default function VerticalLinearStepper() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const [steps, setSteps] = useState([])


  const [classes2, setClasses] = useState([])
  const [loading, setLoading] = useState(false)
  const [info, setInfo] = useState('')
  const [state, setState] = useState({})

  useEffect(() => {
    setSteps(getSteps())
  }, [])

  const handleNext = () => {
    if (activeStep == 0) {
      setLoading(true)
      calculate([state.first, state.second]).then(a => {
        setClasses(a)
        setLoading(false)
        setActiveStep(3)
      }).catch(err => {
        setActiveStep(0)
        setLoading(false)
        setInfo('Tietojen lataus kusi.')
        console.log(err)
      })
    }
    if (activeStep == 1) return setActiveStep(3)

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const handleWhat = () => {
    setActiveStep(3)
    setSteps( ['Valitaan lukujärjestykset', 'Ladataan', 'Nautitaan', 'Mikä linkki?'])
  }

  const classesRender = classes2.map(luokka => {
    return (
      <h3 style={{textDecorationLine: luokka.past && "line-through", opacity: luokka.past && "0.5"}}>{luokka.summary} {luokka.past && "Tämä kurssi meni jo"}</h3>
    )
  })


  return (
    <div>
      <Stepper style={{background: "transparent", padding: 0}} activeStep={activeStep} orientation="vertical">
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
            <StepContent>
              <Typography>{getStepContent(index, info, state, setState)}</Typography>
              <div className={classes.actionsContainer}>
                {activeStep == 3 ? (
                   <Button
                      disabled={activeStep === 0 || activeStep === 1}
                      onClick={() => {
                        setActiveStep(0)
                        setSteps( ['Valitaan lukujärjestykset', 'Ladataan', 'Nautitaan'])
                      }}
                      variant="contained"
                      className={classes.button}
                    >
                      Takaisin
                    </Button>
                ) : (
                  <div>
                    {activeStep !== 0 && (
                      <Button
                          disabled={activeStep === 0 || activeStep === 1}
                          onClick={handleBack}
                          className={classes.button}
                        >
                          Takaisin
                        </Button>
                    )}
                    <Button
                      variant={!state.first ? "contained" : "text"}
                      onClick={handleWhat}
                      className={classes.button}
                    >
                      MIKÄ LINKKI??
                    </Button>
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={handleNext}
                      disabled={activeStep === 1 || !state.first || !state.second}
                      className={classes.button}
                    >
                      {activeStep === steps.length - 1 ? 'Done' : 'Seuraava'}
                    </Button>
                  </div>
                )}
              </div>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length && (
        <div>
          {classesRender}
          <Button onClick={handleReset} class={classes.button}>
            Nollaa kaikki
          </Button>
        </div>
      )}
    </div>
  );
}
