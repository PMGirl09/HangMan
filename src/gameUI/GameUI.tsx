import { Button, Input, Paper, Rating, Typography } from "@mui/material";
import React from 'react';
import SendIcon from '@mui/icons-material/Send';
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
export class GameUI extends React.Component<{}, { currentState: States, answer: String }> {
    private question: String = "How can you make money on stocks you hold apart from their price going up ?";
    private answers: Array<String> = ["Dividents", "Divident"];
    private hint1: String = "As companies make profit, they give back profits to their shareholders this way";
    private hint2: String = "Starts with letters Div";
    private successText = "You did it !";
    private errorText = "No despair!";
    private explaination: String = "Dividents are a way you can make money on stocks you hold, as companies make profit they share their profit with shareholders via quaterly dividents. ";
    constructor(props: {}) {
        super(props);
        this.state = { currentState: States.START, answer: "" };
    }
    render(): React.ReactNode {
        return (
            <Paper elevation={24}>
                <Typography component="h1" fontFamily={'Aladin'} fontSize={46}>FinQuiz!</Typography>
                <Typography>
                    {this.question}
                </Typography>
                <TransitionGroup enter={true}>
                    {(this.state.currentState >= States.FIRST_GUESS) && <><br/><Typography>
                        {"Hint 1: " + this.hint1}
                    </Typography>
                    <br/>
                    </>
                    }
                    {(this.state.currentState >= States.SECOND_GUESS) && <><Typography>
                        {"Hint 2: " + this.hint2}
                    </Typography><br/></>}
                    {(this.state.currentState === States.SUCCESS) && <><Typography>
                        {this.successText}
                    </Typography><br/></>}
                    {(this.state.currentState === States.FAIL) && <Typography>
                        {this.errorText}
                    </Typography>}
                </TransitionGroup>
                {(this.state.currentState === States.FAIL || this.state.currentState === States.SUCCESS) && <Typography>
                    {this.explaination}
                </Typography>}
                <div style={{display: "flex", justifyContent: "center", columnGap: "20px", paddingBottom: "20px", paddingTop: "20px"}}>
                    <Input size={"medium"} style={{ paddingRight: "20px" }} value={this.state.answer} onChange={(ev) => this.handleChange(ev)}></Input>
                    <Button variant="contained" style={{ paddingLeft: "20px" }} onClick={() => this.evalAnswer()} startIcon={<SendIcon />}>
                        Submit
                    </Button>
                    <br/>
                </div>
            </Paper>
        );
    }
    private handleChange(event: any) {
        this.setState({ answer: event.target.value });
    }
    private evalAnswer() {
        if (this.state.answer && this.answers.some(a => a.toLowerCase() === this.state.answer.toLowerCase())) {
            this.setState({ currentState: States.SUCCESS });
        } else {
            if (this.state.currentState < States.SECOND_GUESS) {
                this.setState({ currentState: this.state.currentState + 1 });
            } else {
                this.setState({ currentState: States.FAIL });
            }
        }
    }
}
