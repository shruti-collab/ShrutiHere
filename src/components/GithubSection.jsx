import { useEffect, useState } from "react";
import ContributionSkyline from "@/components/ui/contribution-skyline";
import { githubUser } from "../data.js";

// Pulls your real contribution calendar; falls back to a sample year if the request fails.
export default function GithubSection() {
  const [state, setState] = useState("loading"); // loading | live | sample
  const [days, setDays] = useState(undefined);

  useEffect(() => {
    let off = false;
    fetch(`https://github-contributions-api.jogruber.de/v4/${githubUser}?y=last`)
      .then((r) => { if (!r.ok) throw new Error("bad response"); return r.json(); })
      .then((j) => {
        if (off) return;
        setDays(j.contributions.map(({ date, count }) => ({ date, count })));
        setState("live");
      })
      .catch(() => { if (!off) setState("sample"); });
    return () => { off = true; };
  }, []);

  return (
    <section id="github" className="section">
      <small className="label">Open source, open book</small>
      <div className="folders-head">
        <h2>Code, in public.</h2>
        <p className="scrawl hintr">my year of commits, folded into a city</p>
      </div>
      <div className="gh-wrap">
        {state === "loading" ? (
          <div className="gh-loading" role="status">fetching @{githubUser}'s commits...</div>
        ) : (
          <ContributionSkyline
            data={state === "live" ? days : undefined}
            palette="grape"
            title={<><b>@{githubUser}</b> on GitHub</>}
            footer={state === "sample" ? "Showing a sample year because GitHub data could not be loaded." : undefined}
          />
        )}
        <a className="gh-link" href={`https://github.com/${githubUser}`} target="_blank" rel="noreferrer">Open github.com/{githubUser} →</a>
      </div>
    </section>
  );
}
