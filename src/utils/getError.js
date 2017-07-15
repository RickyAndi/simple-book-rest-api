module.exports = error => {
  const err = new Error();
  err.status = error.status || 500;
  err.message = error.message || 'Something bad happen';
  return err; 
}