import FilmStrip from '../three/FilmStrip';

export default function SelectedWorkShell() {
  return (
    <section className="panel work-panel" id="work">
      <div className="section-title">
        <p>Selected Work</p>
        <h2>Portfolio Carousel</h2>
      </div>
      <FilmStrip />
    </section>
  );
}
