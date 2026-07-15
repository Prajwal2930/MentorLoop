import PrimaryButton from './PrimaryButton';

const AnalyzeButton = ({ isLoading, disabled, onClick }) => (
  <PrimaryButton type="button" className="w-full sm:w-auto" onClick={onClick} disabled={disabled} isLoading={isLoading}>
    {isLoading ? 'Analyzing code...' : 'Analyze code'}
  </PrimaryButton>
);

export default AnalyzeButton;
