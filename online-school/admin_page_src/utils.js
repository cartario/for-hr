export const getTotalModuleDuration = (moduleItem) => {
  const totalModalDuration = moduleItem.themes.reduce((acc, item) => {
    const type = item.durationForPupil;
    return acc + (item[type] || 0);
  }, 0);

  return totalModalDuration;
};

export const checkValid = ({ initProgram, program }) => {
  if (!initProgram || !program) {
    return false;
  }

  if (JSON.stringify(initProgram) === JSON.stringify(program)) {
    return false;
  }

  return true;
};

export const getKlass = () => {
  const searchParams = new URLSearchParams(window.location.search);
  const klass = searchParams.get('pupil_class');
  return klass;
};

export const adaptSendingData = (obj) => {
  const trnasformedObj = { ...obj }; //some actions with obj
  return trnasformedObj;
};
