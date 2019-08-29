import { AnalysisData } from './data.d';

const analysis: AnalysisData = {
  code: 0,
  data: {
    id: String(Date.now()),
  },
  message: 'success',
};

export default {
  'POST  /api/test/analysis': analysis,
};
