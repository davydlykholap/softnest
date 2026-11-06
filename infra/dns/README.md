# DNS inventory

Namecheap Advanced DNS manages softnestcare.ca. Nameservers: dns1.registrar-servers.com and dns2.registrar-servers.com. records.yaml is a documented inventory, not automatic DNS deployment.

SF0: CNAME Record, Host sf0, Value davydlykholap.github.io, TTL Automatic. The user added it November 4, 2026; public resolution was verified. Pages also needs sf0.softnestcare.ca configured in softnest-sf0.

An A record maps a hostname to an IPv4 address; a CNAME maps it to another hostname. Neither refers to source folders. Preserve existing apex, www, Studio, verification and mail records.

Verify public DNS, repository Pages settings and the HTTPS URL. Obtain a complete zone export before a future DNS migration; this inventory is not a full export.
