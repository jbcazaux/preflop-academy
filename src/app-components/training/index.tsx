import { Navigate, Route, Routes } from 'react-router-dom'
import TrainingQueryReader from 'app/training/TrainingQueryReader'

const TrainingSelector = () => (
  <Routes>
    <Route path=":position" element={<TrainingQueryReader />} />
    <Route path="/" element={<Navigate to="B" replace />} />
  </Routes>
)

export default TrainingSelector
