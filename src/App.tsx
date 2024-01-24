import React, { useEffect, useState } from 'react';
import cx from 'classnames';
import { Quiz } from './Quiz';
import char1 from './character/1.png';
import char2 from './character/2.png';
import char3 from './character/3.png';
import { questions } from './questions';
import { useStyles } from './root.styles';

function App() {
    const classes = useStyles();
    const [started, setStarted] = useState<boolean>(!!localStorage.getItem('started_at') ?? false);
    const [finished, setFinished] = useState<boolean>(!!localStorage.getItem('finished_at') ?? false);
    const [currentId, setCurrentId] = useState<number>(0);
    const [animProgress, setAnimProgress] = useState<number>(0);
    const [characterImg, setCharacterImg] = useState<string>(char1);
    const [animStopped, setAnimStopped] = useState<boolean>(false);
    const answers: Array<{ question: string; answer: string }> = JSON.parse(localStorage.getItem('answers') ?? '[]');

    const startQuiz = () => {
        localStorage.setItem('started_at', `${Date.now()}`);
        setStarted(true);
    };

    const stopQuiz = () => {
        localStorage.setItem('finished_at', `${Date.now()}`);
        setFinished(true);
        setAnimProgress(0);
    };

    useEffect(() => {
        setAnimProgress((currentId + 1) / questions.length);
    }, [currentId]);

    useEffect(() => {
        setAnimStopped(false);
        let id = 0;

        const intId = setInterval(() => {
            const images = [char1, char1, char2, char3];

            if (id === 3) {
                id = 0;
            }

            id = id + 1;
            setCharacterImg(images[id]);
        }, 300);

        const tId = setTimeout(() => {
            setAnimStopped(true);
        }, 3000);

        return () => {
            clearTimeout(tId);
            clearInterval(intId);
        };
    }, [animProgress]);

    if (!started) {
        return (
            <div className={classes.startContainer}>
                <div />

                <div className={classes.wrapper}>
                    <h2 className={classes.title}>Заголовок Теста</h2>
                    <p className={classes.subTitle}>Подзаголовок теста</p>
                    <button onClick={startQuiz} className={classes.button}>
                        Начать тест
                    </button>
                </div>

                <a href="https://github.com/gerrronimo" className={classes.link}>
                    github
                </a>
            </div>
        );
    }

    if (finished) {
        // const time =
        //     JSON.parse(localStorage.getItem('finished_at') ?? '0') -
        //     JSON.parse(localStorage.getItem('started_at') ?? '0');
        // const humanTime_seconds = time / 1000;
        // const humanTime_minutes = humanTime_seconds / 60;
        const totalQuestions = questions.length;
        const answeredQuestions = answers.length
            ? questions.filter((question) => answers.some((answer) => answer.question === question.id))
            : [];
        const correctAnswers = answeredQuestions.length
            ? answeredQuestions
                  .map((question) => ({
                      answer: answers.filter((answer) => answer.question === question.id)[0].answer,
                      correct: question.correct_id,
                  }))
                  .map((el) => el.answer === el.correct)
                  .filter((val) => val).length
            : 0;

        const percents = (100 / totalQuestions) * correctAnswers;

        const retry = () => {
            localStorage.clear();
            localStorage.setItem('started_at', `${Date.now()}`);
            setStarted(true);
            setFinished(false);
            setCurrentId(0);
        };

        return (
            <div className={classes.container}>
                <p>Правильно отвечено:</p>
                <div className={classes.result}>
                    <p>{correctAnswers}</p>
                    <p>/</p>
                    <p>{totalQuestions}</p>
                </div>

                <div
                    className={classes.circle}
                    style={{
                        background: `conic-gradient(from 360deg at 50% 50%, transparent 0%, transparent ${
                            100 - percents
                        }%, #A8AD8B ${100 - percents}%, #A8AD8B 100%)`,
                    }}
                >
                    <p className={classes.percents}>{Math.floor(percents)}%</p>
                </div>

                {/* <p>
                    Время прохождения: {Math.floor(humanTime_minutes)}:{Math.floor(humanTime_seconds)}
                </p> */}

                <button onClick={retry} className={classes.button}>
                    Повторить попытку
                </button>
            </div>
        );
    }

    return (
        <div className={classes.container}>
            <Quiz
                id={questions[currentId].id}
                text={questions[currentId].text}
                options={questions[currentId].options}
                nextQuestion={() => setCurrentId((idx) => idx + 1)}
                prevQuestion={() => setCurrentId((idx) => idx - 1)}
                onFinish={stopQuiz}
                selected={answers.length ? answers[currentId]?.answer : null}
                isFirstPage={currentId === 0}
                isLastPage={questions.length === currentId + 1}
            />

            {questions.length !== currentId + 1 && (
                <button onClick={stopQuiz} className={classes.button}>
                    Сдаться
                </button>
            )}

            <div className={classes.characterContainer}>
                <img
                    src={animStopped ? char1 : characterImg}
                    alt="character"
                    className={cx(classes.character, { [classes.animating]: !animStopped })}
                    style={{
                        transform: `translate(calc(100vw * ${animProgress} - 140px)`,
                        transition: 'transform 3s linear',
                    }}
                />
            </div>
        </div>
    );
}

export default App;
