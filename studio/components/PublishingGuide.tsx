export function PublishingGuide() {
  return <div style={{ maxWidth: 720, padding: 32, lineHeight: 1.6 }}>
    <h2>Publish a website change</h2>
    <ol>
      <li>Edit the content and press <strong>Publish</strong> to save the public version in Sanity.</li>
      <li>Open the website deployment workflow below. Choose <strong>Run workflow</strong> on the main branch.</li>
      <li>Wait for the green success mark, then check the website.</li>
    </ol>
    <p><a href="https://github.com/davydlykholap/softnest/actions/workflows/deploy-pages.yml" target="_blank" rel="noreferrer">Open website deployment</a></p>
    <p>Publishing in Studio saves the content. It appears on the website after a successful build. If a build fails, the current website stays online.</p>
    <h3>Where to edit</h3>
    <p><strong>Services &amp; areas:</strong> service details, city page wording, city service wording and coverage settings.</p>
    <p><strong>Proof &amp; answers:</strong> cleaning photos and customer reviews. Only approved items appear. Assign a city and service only when they match the actual appointment.</p>
    <p><strong>Journal:</strong> blog posts, authors and categories. The Card and Our Work introductions are maintained in the website code.</p>
  </div>;
}
