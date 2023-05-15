import {Question} from "../model/question";
import {Button, Card, CardActions, CardContent, Container, Typography} from "@mui/material";
import "./QuestionCard.css";

type QuestionCardProps = {
    question: Question,
    resultMap: Map<string, boolean>,
    saveAnswer: (id: string, answer: boolean) => void,
    handleNext: () => void
}

export default function QuestionCard(props: QuestionCardProps) {


    return (
        <Container sx={{py: 8}} maxWidth="lg">
            <Card variant="outlined" sx={{
                flexDirection: 'column',
                backgroundColor: "#dbf5d8",
                border: '#110101'
            }}>
                <CardContent sx={{flexGrow: 1}}>
                    <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
                        {props.question.poll}
                    </Typography>
                    <Typography variant="h5" component="div">
                    </Typography>
                </CardContent>
                <CardActions sx={{justifyContent: "center"}}>
                    <Button onClick={() => {
                        props.saveAnswer(props.question.id, true)
                        props.handleNext()
                    }} variant="outlined"
                            size="small">Ja</Button>
                    <Button onClick={() => {
                        props.saveAnswer(props.question.id, false)
                        props.handleNext()
                    }} variant="outlined"
                            size="small">Nein</Button>
                </CardActions>
            </Card>
        </Container>

    );
}
