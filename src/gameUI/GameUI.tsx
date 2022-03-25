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
export class GameUI extends React.Component<{}, { currentState: States, answer: String, open: boolean, userid: string }> {
    private question: String = "What is a collection of hundreds or thousands of stocks or bonds in a single fund?";
    private answers: Array<String> = ["ETF","ETFS"];
    private hint1: String = "This trades on major stock exchanges";
    private hint2: String = "You may have seen this on the New York Stock Exchange or NASDAQ";
    private successText = "To earn one point in our challenge, make sure to screenshot this page and DM @PennyUp on our exclusive Discord.Discord access below..";
    private errorText = "No despair!";
    private explaination: String = "An ETF is a collection of hundreds or thousands of stocks or bonds, managed by experts, in a single fund that trades on major stock exchanges, like the New York Stock Exchange and NASDAQ.";
    constructor(props: {}) {
        super(props);
        this.state = { currentState: States.START, answer: "", open: false, userid: this.uuidv4()};
    }
    render(): React.ReactNode {
        const {currentState, open} = this.state;
        return (
            <Paper elevation={4} style={{padding: "40px", minWidth: "800px", minHeight: "500px"}}>
                <Typography component="h1" fontFamily={'Alike'} fontSize={40} fontStyle={{color: 'Purple'}} fontWeight={200}>PennyUp: The Game</Typography>
                <Typography style={{paddingBottom: "20px", paddingTop: "30px"}}  fontSize={22}>
                    {this.question}
                </Typography>
                {(this.state.currentState === States.FIRST_GUESS) && <><br/>
                <Typography fontSize={22}>
                    {"Hint 1: " + this.hint1}
                </Typography>
                <br/>
                </>
                }
                {(this.state.currentState === States.SECOND_GUESS) && <><Typography fontSize={22}>
                    {"Hint 2: " + this.hint2}
                </Typography><br/></>}
                {(this.state.currentState === States.FAIL) && <Typography fontSize={22}>
                    {this.errorText}
                </Typography>}
                {(this.state.currentState === States.FAIL || this.state.currentState === States.SUCCESS) && <Typography fontSize={22} fontStyle={"italic"}>
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
                        <>
                            <span style={{width: "15px"}}></span>
                            <Button variant="contained" endIcon={<ReplayIcon />} onClick={()=> this.retry()} color="error">
                                Try again
                            </Button>
                        </>
                        }
                        </Alert>
                    </Collapse>
                </Grid>
                </div>
                {(this.state.currentState === States.SUCCESS) && <>
                    <Typography  fontFamily={'Alike'} fontSize={40} fontStyle={{color: 'Green'}} fontWeight={200}>
                        CONGRATS, you did it! 
                    </Typography>
                <Typography fontSize={22}>
                    {this.successText}
                </Typography><br/></>}
                {(this.state.currentState === States.FAIL || this.state.currentState === States.SUCCESS) && <Typography fontSize={22} fontStyle={"italic"}>
                    {"Don't forget - new PennyUp released tomorrow 9am EST!"}
                </Typography>}
            </Paper>
        );
    }
    private uuidv4():string {
        var d = new Date().getTime();//Timestamp
        var d2 = ((typeof performance !== 'undefined') && performance.now && (performance.now()*1000)) || 0;//Time in microseconds since page-load or 0 if unsupported
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random() * 16;//random number between 0 and 16
            if(d > 0){//Use timestamp until depleted
                r = (d + r)%16 | 0;
                d = Math.floor(d/16);
            } else {//Use microseconds since page-load if supported
                r = (d2 + r)%16 | 0;
                d2 = Math.floor(d2/16);
            }
            return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
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
        const measurement_id = `G-FJBVQRRG4H`;
        const api_secret = `8Dr-wIp-TjKsItiGH1hoqA`;

        fetch(`https://www.google-analytics.com/mp/collect?measurement_id=${measurement_id}&api_secret=${api_secret}`, {
        method: "POST",
        body: JSON.stringify({
            client_id: this.state.userid,
            events: [{
            name: 'post_score',
            params:  {
                score: 1,
                level: this.state.currentState,
                character: this.state.userid
              },
            }]
        })
        });
        fetch(`https://www.google-analytics.com/mp/collect?measurement_id=${measurement_id}&api_secret=${api_secret}`, {
        method: "POST",
        body: JSON.stringify({
            client_id: this.state.userid,
            events: [{
            name: 'play_attempt',
            params:  {
              },
            }]
        })
        });
        if (this.state.answer && this.answers.some(a => a.toLowerCase() === this.state.answer.toLowerCase())) {
            const attemptBeforeSuccess = this.state.currentState;
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
            fetch(`https://www.google-analytics.com/mp/collect?measurement_id=${measurement_id}&api_secret=${api_secret}`, {
            method: "POST",
            body: JSON.stringify({
                client_id: this.state.userid,
                events: [{
                name: 'play_success',
                params:  {
                    attempt: attemptBeforeSuccess
                },
                }]
            })
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
