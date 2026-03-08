import { RefObject, useRef, useState } from 'react';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import {
	ArticleStateType,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
	OptionType,
} from 'src/constants/articleProps';

import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';

import styles from './ArticleParamsForm.module.scss';

type ArticleParamsFormProps = {
	currentParams: ArticleStateType;
	onApply: (params: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
	currentParams,
	onApply,
}: ArticleParamsFormProps) => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [localParams, setLocalParams] = useState(currentParams);

	const menuRef = useRef<HTMLElement>(null);

	const toggleForm = () => {
		if (!isOpen) return;
		setIsMenuOpen(!isMenuOpen);
	};

	useOutsideClickClose({
		isOpen: isMenuOpen,
		rootRef: menuRef as RefObject<HTMLDivElement>,
		onClose: () => setIsMenuOpen(false),
		onChange: setIsMenuOpen,
	});

	const handleFontFamilyChange = (selected: OptionType) => {
		setLocalParams({ ...localParams, fontFamilyOption: selected });
	};

	const handleFontSizeChange = (selected: OptionType) => {
		setLocalParams({ ...localParams, fontSizeOption: selected });
	};

	const handleFontColorChange = (selected: OptionType) => {
		setLocalParams({ ...localParams, fontColor: selected });
	};

	const handleBackgroundColorChange = (selected: OptionType) => {
		setLocalParams({ ...localParams, backgroundColor: selected });
	};

	const handleContentWidthChange = (selected: OptionType) => {
		setLocalParams({ ...localParams, contentWidth: selected });
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		onApply(localParams);
		setIsMenuOpen(false);
	};

	const handleReset = () => {
		setLocalParams(defaultArticleState);
		onApply(defaultArticleState);
		setIsMenuOpen(false);
	};

	return (
		<>
			<aside
				ref={menuRef}
				className={`${styles.container} ${
					isMenuOpen ? styles.container_open : ''
				}`}
				aria-hidden={!isMenuOpen}>
				<form
					className={styles.form}
					onSubmit={handleSubmit}
					onReset={handleReset}>
					<Select
						selected={localParams.fontFamilyOption}
						options={fontFamilyOptions}
						onChange={handleFontFamilyChange}
						title='Шрифт'
					/>

					<RadioGroup
						name='fontSize'
						options={fontSizeOptions}
						selected={localParams.fontSizeOption}
						onChange={handleFontSizeChange}
						title='Размер шрифта'
					/>

					<Separator />

					<Select
						selected={localParams.fontColor}
						options={fontColors}
						onChange={handleFontColorChange}
						title='Цвет шрифта'
					/>

					<Select
						selected={localParams.backgroundColor}
						options={backgroundColors}
						onChange={handleBackgroundColorChange}
						title='Цвет фона'
					/>

					<Select
						selected={localParams.contentWidth}
						options={contentWidthArr}
						onChange={handleContentWidthChange}
						title='Ширина контента'
					/>

					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>

			<div
				className={`${styles.arrowWrapper} ${
					isMenuOpen ? styles.arrowWrapper_open : ''
				}`}>
				<ArrowButton isOpen={isMenuOpen} onClick={toggleForm} />
			</div>
		</>
	);
};
