import { useNavigate } from 'react-router-dom'
import { canUseHistoryBack } from '../lib/navigation'

interface BackButtonProps {
  fallbackTo: string
  children?: React.ReactNode
}

export function BackButton({ fallbackTo, children = '← Back' }: BackButtonProps) {
  const navigate = useNavigate()

  const goBack = () => {
    if (canUseHistoryBack(window.history.state)) {
      navigate(-1)
      return
    }

    navigate(fallbackTo, { replace: true })
  }

  return (
    <button type="button" className="back-link" onClick={goBack}>
      {children}
    </button>
  )
}
