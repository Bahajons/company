import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import JoditText from './JoditText';
import Select from 'react-select';
import Loading from './Loading';
import { connect } from 'react-redux';
import { addDiagnosticQuestion } from '../../actions';

const DiagnosticsTestQuestionAdd = props => {
	const { t } = useTranslation();
	const [question, setQuestion] = useState(null);
	const [question_e, setQuestionE] = useState('');
	const [type, setType] = useState({ value: 'single', label: t('diagnostics.single') });
	const [loading, setLoading] = useState(false);
	const { category_id, language, diagnostics_question_status, positions } = props;
	useEffect(() => {
		if (diagnostics_question_status.status === 'success') {
			setLoading(false);
			setQuestion('');
			setType({ value: 'single', label: t('diagnostics.single') });
			props.close();
		}
		if (diagnostics_question_status.status === 'error') {
			setLoading(false);
			// setEdit(false);
		}
	}, [diagnostics_question_status]);
	const onSubmit = () => {
		if (question) {
			setLoading(true);
			const data = {
				question: question,
				type: type.value,
				score: 0,
				categories: [parseInt(category_id)],
				language_id: parseInt(language),
				positions: positions
			};
			props.addDiagnosticQuestion(data);
		} else {
			setQuestionE(t('diagnostics.q_e'));
		}
	};
	return (
		<>
			<div className="card card--shadow mt-3" style={{ marginBottom: 30 }}>
				<div className="card-body card-body-diagnostics">
					<div className="row">
						<div className="col-12 dig-title">
							<b>{t('diagnostics.add_q')}</b>
							<span className="icon icon-close" onClick={() => props.close()}></span>
						</div>
						<div className="col-12 mb-1">
							<label>{t('diagnostics.question')}</label>
							<JoditText
								value={question}
								setValue={v => setQuestion(v)}
								setValueE={e => setQuestionE(e)}
							/>
							<div style={{ color: 'red' }}>{question_e}</div>
						</div>
						<div className="col-md-6">
							<div className="form-group mb-1">
								<label>
									{t('diagnostics.type')}
									<div>
										<Select
											value={type}
											onChange={select => {
												setType(select);
											}}
											options={[
												{ value: 'single', label: t('diagnostics.single') },
												{ value: 'multiple', label: t('diagnostics.multiple') },
											]}
											placeholder={t('diagnostics.type')}
										/>
									</div>
								</label>
							</div>
						</div>
						<div className="col-md-6 btn-target">
							{loading ? (
								<Loading />
							) : (
								<button className="btn btn-primary mb-1 mr-1 btn-sm" onClick={() => onSubmit()}>
									{t('diagnostics.save')}
								</button>
							)}
						</div>
					</div>
				</div>
			</div>
		</>
	);
};
export default connect(
	state => ({
		diagnostics_question_status: state.diagnostics_question_status,
	}),
	dispatch => ({
		addDiagnosticQuestion: data => dispatch(addDiagnosticQuestion(data)),
	}),)(DiagnosticsTestQuestionAdd);