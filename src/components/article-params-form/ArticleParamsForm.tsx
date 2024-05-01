import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import { Select } from '../select';
import { RadioGroup } from '../radio-group';
import { Separator } from '../separator';
import { useOutsideClickClose } from '../select/hooks/useOutsideClickClose';
import { useState, useEffect, useRef, SyntheticEvent } from 'react';
import { ArticleStateType, defaultArticleState, fontFamilyOptions, fontColors, backgroundColors, fontSizeOptions, contentWidthArr, OptionType } from 'src/constants/articleProps';

import styles from './ArticleParamsForm.module.scss';
import clsx from 'clsx';


type ArticleParamsFormProps = {
	setNewAppState: (value: ArticleStateType) => void;
}

export const ArticleParamsForm = (props: ArticleParamsFormProps) => {
	const [ state, setState ] = useState(false);

	const [ formState, setFormState ] = useState<ArticleStateType>(defaultArticleState);

	const rootRef = useRef<HTMLDivElement | null>(null);

	const handleClick = () => {
		setState((currentState) => !currentState);
	};

	useOutsideClickClose({
		isOpen: state,
		rootRef,
		onChange: setState,
	});

	const handleChange = (selected: string) => {
		return (value: OptionType) => {
			setFormState((currentFormState) => ({
				...currentFormState,
				[selected]: value,
			}))
		};
	};

	const handleReset = (e: SyntheticEvent) => {
		e.preventDefault();
		setFormState(defaultArticleState);
		props.setNewAppState(defaultArticleState);
	}

	const handleSubmit = (e: SyntheticEvent) => {
		e.preventDefault();
		setState(false);
		props.setNewAppState(formState);
	}
	
	return (
		<div ref={rootRef}>
			<ArrowButton isActive={state} onClick={handleClick}/>
			<aside className={clsx(styles.container, state && styles.container_open)} >
				<form 
					className={styles.form}
					onReset={handleReset}
					onSubmit={handleSubmit}>
					<Select
						title={'шрифт'}
						selected={formState.fontFamilyOption}
						options={fontFamilyOptions}
						onChange={handleChange('fontFamilyOption')}/>
					<RadioGroup
						title={'размер шрифта'}
						name={'fontFamilyOptions'}
						options={fontSizeOptions}
						selected={formState.fontSizeOption}
						onChange={handleChange('fontSizeOption')}/>
					<Select
						title={'цвет шрифта'}
						selected={formState.fontColor}
						options={fontColors}
						onChange={handleChange('fontColor')}/>
					<Separator/>
					<Select
						title={'цвет фона'}
						selected={formState.backgroundColor}
						options={backgroundColors}
						onChange={handleChange('backgroundColor')}/>
					<Select
						title={'ширина контента'}
						selected={formState.contentWidth}
						options={contentWidthArr}
						onChange={handleChange('contentWidth')}/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset'/>
						<Button title='Применить' type='submit'/>
					</div>
				</form>
			</aside>
		</div>
	);
};
