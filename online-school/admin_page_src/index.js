/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  TextField,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { ExpandMore } from '@material-ui/icons';
import lang from 'core/lang';
import Filter from './Filter';

import * as actions from './actions';
import Alert from './Alert';
import { ModuleDurations, ProgramNames, GoalNamesMap, SubjectNamesMap } from './const';
import Topics from './Topics';
import { getTotalModuleDuration } from './utils';
import { RATES } from './const';

const useClasses = makeStyles(() => ({
  module: {
    margin: '20px 0',
  },
  error: {
    border: '1px solid #ff5555',
  },
  details: {
    flexDirection: 'column',
  },
  noProgram: {
    marginTop: 50,
  },
  title: {
    margin: '40px 0',
  },
  btn: {
    margin: '40px 0',
    textAlign: 'right',
  },
  section: {
    marginTop: 40,
  },
}));

const Page = ({
  savePupilProgramAsync,
  program,
  isValid,
  checkValidation,
  fetching,
  updateProgram,
  setPupilGradeGoal,
  setDiagnostics,
  setExamDate,
}) => {
  const classes = useClasses();

  const [userId, setUserId] = useState(null); //todo перенести в redux

  useEffect(() => {
    const id = getId(window.location.pathname);
    setUserId(id);
  }, []);

  useEffect(() => {
    checkValidation();
  }, [program]);

  const onChangeModuleDuration = (e, moduleIdx) => {
    const moduleValue = e.target.value;
    updateProgram({ moduleIdx, moduleValue });
  };

  const onPupilGradeGoalChange = (e) => {
    const value = e.target.value;
    setPupilGradeGoal(value);
  };

  const onDiagnosticsChange = (e, i) => {
    const value = e.target.value;
    setDiagnostics({ value, sectionIndex: i });
  };

  const onExamChange = (e) => {
    const dateId = e.target.value;
    setExamDate(dateId);
  };

  const renderProgram = () => {
    if (!program || !program?.programContents?.length) {
      return (
        <Typography align="center" className={classes.noProgram}>
          {lang(['adminka_individual_program', 'noProgram'])}
        </Typography>
      );
    }

    const {
      programContents,
      recommendedFrequency,
      pupilGradeGoal,
      pupilDiagnostics,
      exams,
      createdAt,
      pupilExamDateId,
    } = program;
    const createdDate = new Date(createdAt);

    const renderPupilGoal = () => {
      return (
        <FormControl className={classes.select} fullWidth>
          <InputLabel id="demo-simple-select-label">
            {lang(['adminka_individual_program', 'goal'])}
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={program.pupilGradeGoal}
            label="PupilGoal"
            onChange={onPupilGradeGoalChange}
          >
            {Object.keys(GoalNamesMap).map((each) => {
              return (
                <MenuItem key={each.id} value={each}>
                  {GoalNamesMap[each]}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      );
    };

    const renderDiagnostics = () => {
      return (
        <div className={classes.section}>
          <Typography gutterBottom>{lang(['adminka_individual_program', 'results'])}</Typography>
          {pupilDiagnostics.map((section, i) => (
            <FormControl key={section.id} className={classes.select} fullWidth>
              <InputLabel id="demo-simple-select-label">
                {SubjectNamesMap[section.section]}
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={section.result}
                label="section"
                onChange={(e) => onDiagnosticsChange(e, i)}
              >
                {RATES.map((each) => {
                  return (
                    <MenuItem key={each} value={each}>
                      {each}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          ))}
        </div>
      );
    };

    const renderExams = () => {
      return (
        <div className={classes.section}>
          <Typography gutterBottom>{lang(['adminka_individual_program', 'exam'])}</Typography>
          <FormControl className={classes.select} fullWidth>
            <InputLabel id="demo-simple-select-label">
              {lang(['adminka_individual_program', 'choose_date'])}
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={pupilExamDateId}
              label="section"
              onChange={onExamChange}
            >
              {exams.map((each) => {
                return (
                  <MenuItem key={each.id} value={each.id}>
                    {each.examDate}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </div>
      );
    };

    const renderSaveBtn = () => {
      const onSubmit = () => savePupilProgramAsync(userId);

      return (
        <div className={classes.btn}>
          <Button disabled={!isValid} variant="contained" color="primary" onClick={onSubmit}>
            {lang(['adminka_individual_program', 'saveProgram'])}
          </Button>
        </div>
      );
    };

    const renderModules = () => {
      return (
        <>
          {programContents &&
            programContents.map((moduleItem, moduleIndex) => (
              <Accordion
                key={moduleItem.id}
                className={`${classes.module} ${
                  moduleItem.durationForPupil === 'pass' && classes.error
                }`}
              >
                <AccordionSummary
                  expandIcon={<ExpandMore />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography color="primary">
                    {lang(['adminka_individual_program', 'module'])}: {moduleItem.moduleTitle}({' '}
                    {lang(['adminka_individual_program', 'totalDuration'])} - {''}{' '}
                    {getTotalModuleDuration(moduleItem)})
                  </Typography>
                </AccordionSummary>
                <AccordionDetails className={classes.details}>
                  <FormControl className={classes.select} fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      {lang(['adminka_individual_program', 'changeDuration'])}
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={moduleItem.durationForPupil}
                      label="Subject"
                      onChange={(e) => onChangeModuleDuration(e, moduleIndex)}
                    >
                      {Object.keys(ModuleDurations).map((each) => {
                        return (
                          <MenuItem key={each.id} value={each}>
                            {ModuleDurations[each]}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                  <Topics topics={moduleItem.themes} moduleIndex={moduleIndex} />
                </AccordionDetails>
              </Accordion>
            ))}
        </>
      );
    };

    return (
      <div>
        <Alert />
        {renderPupilGoal()}
        {renderDiagnostics()}
        {renderExams()}
        {renderModules()}
        {renderSaveBtn()}
      </div>
    );
  };

  return (
    <div>
      <Filter userId={userId} />
      {fetching ? <CircularProgress /> : renderProgram()}
    </div>
  );
};

const mapStateToProps = (state) => state;
const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Page);
