//Importing components
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { RadioGroup } from 'src/ui/radio-group';
import { Select } from 'src/ui/select';
import { Separator } from 'src/ui/separator';
import { Text } from 'src/ui/text';
import { useClose } from 'src/hooks/useClose';


import { SyntheticEvent, useRef, useState } from 'react';

import { fontFamilyOptions, 
	fontColors, 
	backgroundColors, 
	contentWidthArr, 
	fontSizeOptions, 
	ArticleStateType, 
	defaultArticleState, 
	OptionType } from '../../constants/articleProps';
import clsx from 'clsx';
import styles from './ArticleParamsForm.module.scss';


export type ArticleParamsFormProps = {
	setArticleStyle: React.Dispatch<React.SetStateAction<{
		fontFamilyOption: OptionType;
		fontColor: OptionType;
		backgroundColor: OptionType;
		contentWidth: OptionType;
		fontSizeOption: OptionType;
	}>>;
}


export const ArticleParamsForm = (props: ArticleParamsFormProps) => {	
	const [ isMenuOpen, setisMenuOpen ] = useState(false) 
	const [ articleState, setArticleState ] = useState(defaultArticleState)
	const ArticleParamsFormRef = useRef<HTMLDivElement>(null)

	function closeMenu() {
		setisMenuOpen(false);		
	}

	useClose({ 
		isOpen: isMenuOpen, 
		onClose: closeMenu, 
		rootRef: ArticleParamsFormRef 
	})


	const handleSubmit = (event: SyntheticEvent) => {
		event?.preventDefault();
		props.setArticleStyle(articleState);
	} 

	const handleReset = () => {
		setArticleState(defaultArticleState);
		props.setArticleStyle(defaultArticleState);
	};
   
	const handleChange = (type: keyof ArticleStateType, value: OptionType) => {
		setArticleState({
	  ...articleState,
	  [type]: value
	 })
	};


	return (
		<div ref={ArticleParamsFormRef}>
			<ArrowButton isOpen={isMenuOpen} onClick={() => {
				setisMenuOpen(!isMenuOpen)
				}} />
				
			<aside className={ isMenuOpen ? clsx(styles.container, styles.container_open) : styles.container}>
				<form className={styles.form} onSubmit={handleSubmit}>

					<Text as={"h2"}  size={31} weight={800} uppercase={true} >Задайте параметры</Text>
						
					<Select title="Шрифт"
						selected={articleState.fontFamilyOption}
						options={fontFamilyOptions}
						onChange={(option) => {handleChange('fontFamilyOption', option)}}/>

					<RadioGroup 
					title="Размер" 
					name="fontSize"
					selected={articleState.fontSizeOption}
					options={fontSizeOptions}
					onChange={(option) => {
						handleChange('fontSizeOption', option)
					}}/>

					<Select title="Цвет шрифта"
						selected={articleState.fontColor}
						options={fontColors}
						onChange={(option) => {handleChange('fontColor', option)}}/>

					<Separator />

					<Select title="Цвет фона"
						selected={articleState.backgroundColor}
						options={backgroundColors}
						onChange={(option) => {handleChange('backgroundColor', option)}}/>

					<Select title="Ширина контента"
						selected={articleState.contentWidth}
						options={contentWidthArr}
						onChange={(option) => {handleChange('contentWidth', option)}}/>



					<div className={styles.bottomContainer}>						 
						<Button title='Сбросить' htmlType='reset' type='clear' onClick={handleReset} />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</div>
	);
};
