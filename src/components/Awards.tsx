import { useId, useState } from 'react'
import { CaretDown } from '@phosphor-icons/react'
import { awards } from '@/data/portfolio'

function AwardItem({ title, detail, date }: { title: string; detail: string; date?: string }) {
  const [open, setOpen] = useState(false)
  const panelId = useId()
  const btnId = useId()

  return (
    <div className="accordion__item">
      <h3>
        <button
          type="button"
          id={btnId}
          className="accordion__btn"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((v) => !v)}
        >
          <span>
            {title}
            {date ? <span className="muted"> · {date}</span> : null}
          </span>
          <CaretDown size={18} className={open ? 'caret is-open' : 'caret'} aria-hidden />
        </button>
      </h3>
      <div id={panelId} role="region" aria-labelledby={btnId} hidden={!open}>
        <p>{detail}</p>
      </div>
    </div>
  )
}

export default function Awards() {
  return (
    <section id="awards" className="section section--alt" aria-labelledby="awards-heading" data-reveal>
      <div className="container narrow">
        <p className="eyebrow">Recognition</p>
        <h2 id="awards-heading">Awards & Activities</h2>
        <div className="accordion">
          {awards.map((a) => (
            <AwardItem key={a.title + (a.date ?? '')} {...a} />
          ))}
        </div>
      </div>
    </section>
  )
}
