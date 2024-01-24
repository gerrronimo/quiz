import React, { FC, useEffect, useState } from 'react';
import { GoChevronLeft, GoChevronRight } from 'react-icons/go';
import cx from 'classnames';
import { useStyles } from './quiz.styles';

export interface IQuizProps {
    id: string;
    text: string;
    selected: string | null;
    isFirstPage: boolean;
    isLastPage: boolean;
    options: Array<{
        id: string;
        text: string;
    }>;
    nextQuestion: () => void;
    prevQuestion: () => void;
    onFinish: () => void;
}

export const Quiz: FC<IQuizProps> = ({
    id,
    text,
    options,
    selected,
    isFirstPage,
    isLastPage,
    nextQuestion,
    prevQuestion,
    onFinish,
}) => {
    const classes = useStyles();
    const [_selected, setSelected] = useState<string | null>(null);

    useEffect(() => {
        setSelected(selected);
    }, [selected]);

    const select = (newId: string) => {
        setSelected((_id) => (_id === newId ? null : newId));

        const answers: Array<{ question: string; answer: string }> = JSON.parse(
            localStorage.getItem('answers') ?? '[]',
        );

        if (answers.some((answer) => answer.question === id)) {
            localStorage.setItem('answers', JSON.stringify([...answers.filter((answer) => answer.question !== id)]));
            return;
        }

        localStorage.setItem(
            'answers',
            JSON.stringify([
                ...answers.filter((answer) => answer.question !== id),
                {
                    question: id,
                    answer: newId,
                },
            ]),
        );
    };

    return (
        <div className={classes.container}>
            <div className={classes.content}>
                <div />

                <div className={classes.controls}>
                    <button
                        className={cx(classes.button, { [classes.disabled]: isFirstPage })}
                        onClick={!isFirstPage ? prevQuestion : () => null}
                    >
                        <GoChevronLeft size={24} />
                    </button>
                    <h2>{text}</h2>
                    {isLastPage ? (
                        <button className={classes.button} onClick={onFinish}>
                            Завершить
                        </button>
                    ) : (
                        <button className={classes.button} onClick={nextQuestion}>
                            <GoChevronRight size={24} />
                        </button>
                    )}
                </div>

                <div>
                    {options.map(({ id: optionId, text }) => (
                        <div
                            onClick={() => select(optionId)}
                            className={cx(classes.option, {
                                [classes.selected]: _selected === optionId,
                            })}
                        >
                            {text}
                        </div>
                    ))}
                </div>

                <div />
                <div />
            </div>
        </div>
    );
};
