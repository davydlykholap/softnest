export function PublishingGuide() {
  return <div style={{ maxWidth: 720, padding: 32, lineHeight: 1.6 }}>
    <h2>Publish a website change</h2>
    <ol>
      <li>Edit the content and press <strong>Publish</strong> to save the public version in Sanity.</li>
      <li>Sanity automatically starts the GitHub Pages build after you publish. You do not need to open GitHub.</li>
      <li>Allow a few minutes for validation and deployment, then check the public website.</li>
    </ol>
    <p>If the automatic build does not start, <a href="https://github.com/davydlykholap/softnest/actions/workflows/deploy-pages.yml" target="_blank" rel="noreferrer">open deployment status or run it manually</a>.</p>
    <p>Published changes go live after a successful build. Saving a draft does not start deployment. If a build fails, the currently deployed website stays online.</p>
    <h3>Where to edit</h3>
    <p><strong>Services &amp; areas:</strong> service details, city page wording, city service wording and coverage settings.</p>
    <p><strong>Proof &amp; answers:</strong> to add a documented cleaning job, choose photo authenticity, assign its actual appointment city and service, upload the photo, and select Approved for website. Clearly describe any recreated comparison in Photo context. Illustrations are not treated as completed customer jobs.</p>
    <p><strong>Journal:</strong> blog posts, authors and categories. The Card and Our Work introductions are maintained in the website code.</p>
  </div>;
}
