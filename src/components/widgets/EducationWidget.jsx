import { FaGraduationCap } from 'react-icons/fa'
import { config } from '../../config'

const EducationWidget = () => {
  const { degree, university, years, gpa } = config.education

  return (
    <div className="glass-card p-4 h-full flex flex-col justify-center">
      <div className="flex items-center gap-2 mb-3 theme-text-sub">
        <FaGraduationCap className="text-lg" />
        <span className="font-display font-semibold text-[10px] uppercase" style={{ letterSpacing: '0.12em' }}>Education</span>
      </div>

      <div className="space-y-1.5">
        <h4 className="text-base font-display font-semibold text-primary-500">{degree}</h4>
        <p className="theme-text-sub text-xs font-sans leading-relaxed">{university}</p>
        <div className="flex items-center gap-2 flex-wrap">
          <span className="inline-block px-2 py-0.5 theme-surface rounded-md text-[10px] theme-text-muted font-display uppercase" style={{ letterSpacing: '0.08em' }}>
            {years}
          </span>
          {gpa && (
            <span className="inline-block px-2 py-0.5 bg-primary-500/20 border border-primary-500/30 rounded-md text-[10px] text-primary-500 font-display font-semibold uppercase" style={{ letterSpacing: '0.08em' }}>
              GPA: {gpa}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}

export default EducationWidget
