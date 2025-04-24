
import { Button } from './ui/button'
import { useRefreshToken } from '@/services/auth/mutations';
import { useLocalStorage } from '@/hooks/useLocalStorage';

const DebugTools = () => {
    const { refresh } = useRefreshToken();
    const { removeItem } = useLocalStorage("tokens");

  return (
    <div className="space-x-4">
    <Button onClick={() => refresh()}>refresh</Button>
    <Button onClick={() => removeItem()}>remove tokens</Button>
    </div>
  )
}

export default DebugTools