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
    private question: String = "What is the original value or purchase price of an investment for tax purposes?";
    private answers: Array<String> = ["Cost Basis","Costbasis","costBasis","CostBasis","Cost basis","cost Basis"];
    private hint1: String = "This is used to calculate the capital gains tax rate from your investment";
    private hint2: String = "It is made up of two words";
    private successText = "To earn one point in our challenge, make sure to screenshot this page and DM @PennyUp on our exclusive Discord.Discord access below..";
    private errorText = "No despair!";
    private explaination: String = "Cost basis is the original value or purchase price of an asset or investment for tax purposes and used to calculate the capital gains tax rate, which is the difference between the asset's cost basis and current market value.";
    constructor(props: {}) {
        super(props);
        this.state = { currentState: States.START, answer: "", open: false};
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
            client_id: 'XXXXXXXXXX',
            events: [{
            name: 'play_attempt',
            params: {},
            }]
        })
        });
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
