import { Button, Input, Paper, Rating, Typography, Grid } from "@mui/material";
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';
import React from 'react';
import SendIcon from '@mui/icons-material/Send';
import ReplayIcon from '@mui/icons-material/Replay';
import confetti from 'canvas-confetti';

import {
    CSSTransition,
    TransitionGroup,
} from 'react-transition-group';

enum States {
    START,
    FIRST_GUESS,
    SECOND_GUESS,
    SUCCESS,
    FAIL
}
export class GameUI extends React.Component<{}, { currentState: States, answer: String, open: boolean }> {
    private question: String = "How can you make money on stocks you hold, apart from their price going up?";
    private answers: Array<String> = ["Dividends", "Dividend", "cost basis", "Cost Basis", "Cost basis", "cost Basis", "costbasis", "CostBasis"];
    private hint1: String = "As companies make profit, they give back profits to their shareholders this way";
    private hint2: String = "Starts with letters Div";
    private successText = "You did it ! Yes Girl! 🌠";
    private errorText = "No despair!";
    private explaination: String = "Dividends are a way you can make money on stocks you hold, as companies make profit they share their profit with shareholders via quaterly dividends. ";
    constructor(props: {}) {
        super(props);
        this.state = { currentState: States.START, answer: "", open: false};
    }
    render(): React.ReactNode {
        const {currentState, open} = this.state;
        return (
            <Paper elevation={4} style={{width:"800px", height:"600px", alignContent: "center", alignSelf: "center",justifyContent: "center",paddingTop: "200px"}}>
                <Typography component="h1" fontFamily={'Aladin'} fontSize={40} fontStyle={{color: 'Purple'}} fontWeight={200}>PennyUp: The Game</Typography>
                <Typography style={{paddingBottom: "20px", paddingTop: "30px"}}>
                    {this.question}
                </Typography>
                {(this.state.currentState === States.FIRST_GUESS) && <><br/><Typography>
                    {"Hint 1: " + this.hint1}
                </Typography>
                <br/>
                </>
                }
                {(this.state.currentState === States.SECOND_GUESS) && <><Typography>
                    {"Hint 2: " + this.hint2}
                </Typography><br/></>}
                {(this.state.currentState === States.SUCCESS) && <><Typography>
                    {this.successText}
                </Typography><br/></>}
                {(this.state.currentState === States.FAIL) && <Typography>
                    {this.errorText}
                </Typography>}
                {(this.state.currentState === States.FAIL || this.state.currentState === States.SUCCESS) && <Typography>
                    {this.explaination}
                </Typography>}
                <div style={{display: "flex", justifyContent: "center", columnGap: "20px", paddingBottom: "20px", paddingTop: "20px"}}>
                <Grid
                    container
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                >
                    <Grid
                        container
                        direction="row"
                        justifyContent="center"
                        alignItems="center"
                        columnSpacing={5}
                    >
                        <Input size={"medium"} 
                        value={this.state.answer} onChange={(ev) => this.handleChange(ev)}></Input>
                        <span style={{width: "15px"}}></span>
                        <Button variant="contained" onClick={() => this.evalAnswer()} color={'secondary'}>
                        <Typography component="h1" fontFamily={'verdana'} fontSize={16} fontStyle={{color: 'white'}} fontWeight={400}>Submit!</Typography>
                        </Button>
                    </Grid>
                    <br/>
                    <Collapse in={open}>
                        <Alert
                            severity="error"
                        sx={{ mb: 2 }}
                        >
                        Sorry that was wrong answer !
                        {(currentState !== States.FAIL) && 
                        <Button variant="contained" endIcon={<ReplayIcon />} onClick={()=> this.retry()} color="error">
                            Try again
                        </Button>}
                        </Alert>
                    </Collapse>
                </Grid>
                </div>
            </Paper>
        );
    }
    private retry() {
        this.setState({answer: "", currentState: this.state.currentState + 1, open: false });
    }
    private setOpen(show:boolean) {
        this.setState({open: show});
    }
    private handleChange(event: any) {
        this.setState({ answer: event.target.value });
    }
    private evalAnswer() {
        if (this.state.answer && this.answers.some(a => a.toLowerCase() === this.state.answer.toLowerCase())) {
            this.setState({ currentState: States.SUCCESS });
            confetti({
                shapes: ['square'],
                particleCount: 100,
                spread: 90,
                origin: {
                    y: (1),
                    x: (0.5)
                }
            });
        } else {
            if (this.state.currentState < States.SECOND_GUESS) {
                // this.setState({ currentState: this.state.currentState + 1 });
            } else {
                this.setState({ currentState: States.FAIL });
            }
            this.setState({open: true});
        }
    }
}
