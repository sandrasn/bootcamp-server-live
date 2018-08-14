import Logger from '../utils/logger';

const logger = Logger('indexController');

const index = async (req, res) => {
  logger.log('info', 'Index controller was called!');
  res.status(200).send({ message: 'It works!' });
};

export default index; // export index as a function not the value that returns, for value returning use index()
