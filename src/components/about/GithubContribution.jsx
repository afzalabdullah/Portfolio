import React, { useState, useEffect } from "react";
import "./github.css";

const GITHUB_USERNAME = "afzalabdullah";

const GithubContribution = () => {
  const [data, setData] = useState(null);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    const currentTheme = document.documentElement.getAttribute("data-theme");
    setTheme(currentTheme || "dark");

    const observer = new MutationObserver(() => {
      setTheme(document.documentElement.getAttribute("data-theme") || "dark");
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const fetchGithubData = async () => {
      try {
        const [contribRes, reposRes] = await Promise.all([
          fetch(`https://github-contributions-api.deno.dev/${GITHUB_USERNAME}.json`),
          fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`),
        ]);

        const contribData = await contribRes.json();
        const reposData = await reposRes.json();

        setData(contribData);

        // Process live language data
        const langMap = {};
        reposData.forEach((repo) => {
          if (repo.language) {
            langMap[repo.language] = (langMap[repo.language] || 0) + (repo.size || 1);
          }
        });

        const sorted = Object.entries(langMap)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 8); // Show top 8 languages

        setRepos(sorted);
        setLoading(false);
      } catch (err) {
        console.error("GitHub API error:", err);
        setLoading(false);
      }
    };

    fetchGithubData();
  }, []);

  const langColors = {
    JavaScript: "#f7df1e",
    TypeScript: "#3178c6",
    Python: "#3776AB",
    "C#": "#178600",
    HTML: "#e34c26",
    CSS: "#563d7c",
    Dart: "#0175C2",
    Java: "#b07219",
    PHP: "#4F5D95",
    Go: "#00ADD8",
    Rust: "#dea584",
    Swift: "#F05138",
    Ruby: "#701516",
    "C++": "#f34b7d",
  };

  const totalSize = repos.reduce((s, [, size]) => s + size, 0);
  const isDark = theme === "dark";
  const statsCardBg = isDark ? "0d1117" : "ffffff";
  const statsCardBorder = isDark ? "334155" : "cbd5e1";
  const statsCardTitle = isDark ? "f59e0b" : "d97706";
  const statsCardText = isDark ? "94a3b8" : "475569";

  return (
    <div className="github-section">
      <div className="github-section__grid">
        {/* Top Languages - Enhanced Dynamic Section */}
        <div className="github-card github-card--languages">
          <div className="github-card__header">
            <span className="card-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg></span>
            <h4 className="github-card__title">Language Proficiency</h4>
          </div>
          <div className="github-card__body">
            {loading ? (
              <div className="github-lang-skeleton">
                {[1,2,3,4,5].map(i => <div key={i} className="skeleton-bar" />)}
              </div>
            ) : (
              <div className="github-lang-chart">
                {/* Donut Chart */}
                <div className="lang-donut-wrapper">
                  <svg className="lang-donut" viewBox="0 0 120 120">
                    {(() => {
                      let offset = 0;
                      const radius = 45;
                      const circumference = 2 * Math.PI * radius;
                      return repos.map(([lang, size]) => {
                        const percent = (size / totalSize) * 100;
                        const dashLength = (percent / 100) * circumference;
                        const gap = circumference - dashLength;
                        const currentOffset = offset;
                        offset += percent;
                        return (
                          <circle
                            key={lang}
                            cx="60"
                            cy="60"
                            r={radius}
                            fill="none"
                            stroke={langColors[lang] || "#64748b"}
                            strokeWidth="12"
                            strokeDasharray={`${dashLength} ${gap}`}
                            strokeDashoffset={-(currentOffset / 100) * circumference}
                            strokeLinecap="butt"
                            className="lang-donut__segment"
                            style={{ animationDelay: `${repos.indexOf(repos.find(r => r[0] === lang)) * 0.05}s` }}
                          />
                        );
                      });
                    })()}
                  </svg>
                  <div className="lang-donut__center">
                    <span className="lang-donut__count">{repos.length}</span>
                    <span className="lang-donut__label">Languages</span>
                  </div>
                </div>

                {/* Legend Grid */}
                <div className="lang-legend">
                  {repos.map(([lang, size]) => {
                    const percent = Math.round((size / totalSize) * 100);
                    return (
                      <div key={lang} className="lang-legend__item">
                        <span className="lang-legend__dot" style={{ background: langColors[lang] || "#64748b" }} />
                        <span className="lang-legend__name">{lang}</span>
                        <span className="lang-legend__pct">{percent}%</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Contribution Graph */}
        <div className="github-card github-card--contrib">
          <div className="github-card__header">
            <span className="card-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="9" y1="21" x2="9" y2="9"></line></svg></span>
            <h4 className="github-card__title">Contribution Heatmap</h4>
          </div>
          <div className="github-card__body">
            <img
              src={`https://ghchart.rshah.org/f59e0b/${GITHUB_USERNAME}`}
              alt="Contribution Graph"
              className="github-contrib-img"
              style={{
                filter: isDark ? "brightness(1.1) contrast(1.15)" : "brightness(0.85) contrast(1.2)",
              }}
            />
            {data && (
              <div className="github-contrib-footer">
                <span>Total contributions in the last year: <strong>{data.totalContributions}</strong></span>
              </div>
            )}
          </div>
        </div>

        {/* Streak Stats */}
        <div className="github-card github-card--streak">
          <div className="github-card__header">
            <span className="card-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"></path></svg></span>
            <h4 className="github-card__title">Consistency Pulse</h4>
          </div>
          <div className="github-card__body">
            <img
              src={`https://streak-stats.demolab.com?user=${GITHUB_USERNAME}&theme=${isDark ? "dark" : "default"}&background=${statsCardBg}&border=${statsCardBorder}&stroke=${statsCardBorder}&ring=${statsCardTitle}&fire=${statsCardTitle}&currStreakLabel=${statsCardTitle}&sideLabels=${statsCardText}&currStreakNum=${isDark ? "f1f5f9" : "0f172a"}&sideNums=${isDark ? "f1f5f9" : "0f172a"}&dates=${statsCardText}&hide_border=true`}
              alt="GitHub Streak"
              className="github-streak-img"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GithubContribution;
