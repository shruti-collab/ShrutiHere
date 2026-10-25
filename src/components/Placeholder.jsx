export default function Placeholder({ label = "image" }) {
  return <div className="placeholder" role="img" aria-label={`${label} placeholder`}><span>{label}</span></div>;
}
