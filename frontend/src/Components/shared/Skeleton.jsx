const Skeleton = ({ items = 4, variant = "card", className = "" }) => {
  const skeletonItems = Array.from({ length: items })

  const renderCard = (index) => (
    <div
      key={index}
      className="overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-sm animate-pulse"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="h-28 w-full rounded-3xl bg-slate-200 sm:h-28 sm:w-28" />
        <div className="flex-1 space-y-3">
          <div className="h-5 w-3/4 rounded-full bg-slate-200" />
          <div className="h-4 w-1/2 rounded-full bg-slate-200" />
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="h-4 rounded-full bg-slate-200" />
            <div className="h-4 rounded-full bg-slate-200" />
          </div>
        </div>
      </div>
      <div className="mt-6 space-y-3">
        <div className="h-4 rounded-full bg-slate-200" />
        <div className="h-4 w-5/6 rounded-full bg-slate-200" />
      </div>
    </div>
  )

  const renderForm = (index) => (
    <div key={index} className="space-y-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm animate-pulse">
      <div className="h-8 w-2/3 rounded-full bg-slate-200" />
      <div className="space-y-3">
        <div className="h-12 rounded-2xl bg-slate-200" />
        <div className="h-12 rounded-2xl bg-slate-200" />
        <div className="h-12 rounded-2xl bg-slate-200" />
        <div className="h-12 rounded-2xl bg-slate-200" />
        <div className="h-12 rounded-2xl bg-slate-200" />
      </div>
      <div className="mt-4 h-12 w-1/2 rounded-2xl bg-slate-200" />
    </div>
  )

  return (
    <div className={`space-y-4 ${className}`}>
      {skeletonItems.map((_, index) =>
        variant === "form" ? renderForm(index) : renderCard(index)
      )}
    </div>
  )
}

export default Skeleton
