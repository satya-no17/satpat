import { Spinner } from '@/components/ui/spinner'

export default function DashboardLoading() {
  return (
    <div className="flex min-h-[calc(100vh-5rem)] items-center justify-center p-6" role="status">
      <div className="flex items-center gap-3 rounded-xl border bg-card px-5 py-4 shadow-sm">
        <Spinner className="size-5" />
        <span className="text-sm text-muted-foreground">Loading your dashboard…</span>
      </div>
    </div>
  )
}
