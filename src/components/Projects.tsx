import { useCallback, useEffect, useId, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { ArrowSquareOut, GithubLogo, Play, X } from '@phosphor-icons/react'
import {
  figmaEmbedSrc,
  isPlaceholderLink,
  projectFilters,
  projects,
  type Project,
  type ProjectCategory,
} from '@/data/portfolio'
import { useMediaQuery } from '@/hooks/useMediaQuery'

type Filter = 'all' | ProjectCategory

function youtubeEmbed(url: string): string | null {
  const m =
    url.match(/youtu\.be\/([\w-]+)/) ||
    url.match(/[?&]v=([\w-]+)/) ||
    url.match(/youtube\.com\/embed\/([\w-]+)/)
  return m ? `https://www.youtube.com/embed/${m[1]}` : null
}

function driveEmbed(url: string): string | null {
  const m = url.match(/\/d\/([a-zA-Z0-9_-]+)/)
  return m ? `https://drive.google.com/file/d/${m[1]}/preview` : null
}

function MediaPlayer({ project, autoPreview }: { project: Project; autoPreview?: boolean }) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const canHover = useMediaQuery('(hover: hover) and (pointer: fine)')
  const src = project.videoUrl

  useEffect(() => {
    const el = videoRef.current
    if (!el || !autoPreview || !canHover) return
    el.play().catch(() => {})
    return () => {
      el.pause()
      el.currentTime = 0
    }
  }, [autoPreview, canHover])

  if (!src) {
    return (
      <img src={project.poster} alt="" className="media-poster" />
    )
  }

  const yt = youtubeEmbed(src)
  if (yt) {
    return (
      <iframe
        className="media-frame"
        src={yt}
        title={`${project.title} demo`}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    )
  }

  const drive = driveEmbed(src)
  if (drive) {
    return (
      <iframe className="media-frame" src={drive} title={`${project.title} demo`} allow="autoplay" allowFullScreen />
    )
  }

  return (
    <video
      ref={videoRef}
      className="media-video"
      poster={project.poster}
      controls={!autoPreview}
      muted={Boolean(autoPreview)}
      loop={Boolean(autoPreview)}
      playsInline
      preload="metadata"
    >
      <source src={src} type="video/mp4" />
    </video>
  )
}

function ProjectModal({
  project,
  onClose,
}: {
  project: Project
  onClose: () => void
}) {
  const titleId = useId()
  const closeRef = useRef<HTMLButtonElement>(null)
  const dialogRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const prev = document.activeElement as HTMLElement | null
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key !== 'Tab' || !dialogRef.current) return
      const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), textarea, input, select, iframe, video, [tabindex]:not([tabindex="-1"])',
      )
      if (!focusable.length) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
      prev?.focus()
    }
  }, [onClose])

  const showFigma = Boolean(project.figmaUrl && !isPlaceholderLink(project.figmaUrl))

  return createPortal(
    <div
      className="modal-backdrop"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div
        ref={dialogRef}
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
      >
        <button ref={closeRef} type="button" className="modal__close" onClick={onClose} aria-label="Close details">
          <X size={20} weight="bold" />
        </button>
        <div className="modal__media">
          {showFigma ? (
            <iframe
              className="media-frame"
              src={figmaEmbedSrc(project.figmaUrl!)}
              title={`${project.title} Figma prototype`}
              allowFullScreen
            />
          ) : (
            <MediaPlayer project={project} />
          )}
        </div>
        <div className="modal__body">
          <p className="eyebrow">{project.role}</p>
          <h3 id={titleId}>{project.title}</h3>
          {project.date ? <p className="muted">{project.date}</p> : null}
          {project.award && <p className="pill">{project.award}</p>}
          <p>{project.description}</p>
          {project.insights && (
            <>
              <h4>Insights</h4>
              <p>{project.insights}</p>
            </>
          )}
          {project.problem && (
            <>
              <h4>Problem</h4>
              <p>{project.problem}</p>
            </>
          )}
          {project.solution && (
            <>
              <h4>Solution</h4>
              <p>{project.solution}</p>
            </>
          )}
          {project.features && project.features.length > 0 && (
            <>
              <h4>Features</h4>
              <ul>
                {project.features.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
            </>
          )}
          {project.techStack.length > 0 && (
            <>
              <h4>Tech</h4>
              <ul className="chips">
                {project.techStack.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </>
          )}
          {project.screenshots.length > 0 && (
            <>
              <h4>Screenshots</h4>
              <div className="shot-grid">
                {project.screenshots.map((s) => (
                  <img key={s.src} src={s.src} alt={s.alt} loading="lazy" />
                ))}
              </div>
            </>
          )}
          <div className="modal__links">
            {project.figmaUrl && (
              <a className="btn btn--primary" href={project.figmaUrl} target="_blank" rel="noreferrer">
                View in Figma
                <ArrowSquareOut size={16} aria-hidden />
              </a>
            )}
            {project.liveUrl && !isPlaceholderLink(project.liveUrl) && (
              <a className="btn btn--ghost" href={project.liveUrl} target="_blank" rel="noreferrer">
                View Project
                <ArrowSquareOut size={16} aria-hidden />
              </a>
            )}
            {project.githubUrl && !isPlaceholderLink(project.githubUrl) && (
              <a className="btn btn--ghost" href={project.githubUrl} target="_blank" rel="noreferrer">
                <GithubLogo size={16} aria-hidden />
                GitHub
              </a>
            )}
          </div>
        </div>
      </div>
    </div>,
    document.body,
  )
}

function Card({ project, onOpen }: { project: Project; onOpen: (p: Project, el: HTMLElement) => void }) {
  const [hover, setHover] = useState(false)
  const canHover = useMediaQuery('(hover: hover) and (pointer: fine)')
  const fileVideo = Boolean(project.videoUrl && !youtubeEmbed(project.videoUrl) && !driveEmbed(project.videoUrl))

  return (
    <article
      className="project-card"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div className="project-card__media">
        {canHover && hover && fileVideo ? (
          <MediaPlayer project={project} autoPreview />
        ) : (
          <img src={project.poster} alt={`${project.title} preview`} loading="lazy" />
        )}
      </div>
      <div className="project-card__body">
        <h3>{project.title}</h3>
        <p>{project.description}</p>
        <p className="muted">
          Role: {project.role}
          {project.date ? ` · ${project.date}` : ''}
        </p>
        {project.techStack.length > 0 && (
          <ul className="chips">
            {project.techStack.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        )}
        <div className="project-card__actions">
          {project.category === 'systems' && project.videoUrl && (
            <button type="button" className="btn btn--ghost btn--sm" onClick={(e) => onOpen(project, e.currentTarget)}>
              <Play size={16} weight="fill" aria-hidden />
              Watch Demo
            </button>
          )}
          {project.category === 'figma' && project.figmaUrl && (
            <a className="btn btn--ghost btn--sm" href={project.figmaUrl} target="_blank" rel="noreferrer">
              View in Figma
            </a>
          )}
          {project.liveUrl && !isPlaceholderLink(project.liveUrl) && (
            <a className="btn btn--ghost btn--sm" href={project.liveUrl} target="_blank" rel="noreferrer">
              View Project
              <ArrowSquareOut size={16} aria-hidden />
            </a>
          )}
          <button type="button" className="btn btn--primary btn--sm" onClick={(e) => onOpen(project, e.currentTarget)}>
            View Details
          </button>
        </div>
      </div>
    </article>
  )
}

export default function Projects() {
  const [filter, setFilter] = useState<Filter>('all')
  const [active, setActive] = useState<Project | null>(null)

  const open = useCallback((p: Project, _el: HTMLElement) => {
    setActive(p)
  }, [])

  const close = useCallback(() => setActive(null), [])

  const visible = projects.filter((p) => filter === 'all' || p.category === filter)

  return (
    <section id="projects" className="section" aria-labelledby="projects-heading" data-reveal>
      <div className="container">
        <p className="eyebrow">Selected work</p>
        <h2 id="projects-heading">Projects</h2>
        <p className="lede">
          Filter by type. Open a card for details, demos, and project files.
        </p>
        <div className="tabs" role="tablist" aria-label="Project type">
          {projectFilters.map((tab) => (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={filter === tab.id}
              className={filter === tab.id ? 'tabs__btn is-active' : 'tabs__btn'}
              onClick={() => setFilter(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className="card-grid">
          {visible.map((p) => (
            <Card key={p.id} project={p} onOpen={open} />
          ))}
        </div>
      </div>
      {active && <ProjectModal project={active} onClose={close} />}
    </section>
  )
}
