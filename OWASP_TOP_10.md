# OWASP Top 10 Web Application Security Risks (2021)

1. **Broken Access Control**
   - Restrictions on what authenticated users are allowed to do are often not properly enforced. Attackers can exploit these flaws to access unauthorized functionality or data.

2. **Cryptographic Failures**
   - Formerly known as Sensitive Data Exposure. Focuses on failures related to cryptography, which often lead to exposure of sensitive data or system compromise.

3. **Injection**
   - Includes SQL, NoSQL, OS, and LDAP injection flaws. Occurs when untrusted data is sent to an interpreter as part of a command or query.

4. **Insecure Design**
   - New category. Focuses on risks related to design flaws, such as lack of secure design patterns, threat modeling, or reference architectures.

5. **Security Misconfiguration**
   - The most common issue. Includes misconfigured permissions, default accounts, unnecessary features, and more. XML External Entities (XXE) is now part of this category.

6. **Vulnerable and Outdated Components**
   - Formerly "Using Components with Known Vulnerabilities." Refers to using libraries, frameworks, and other software modules with known vulnerabilities.

7. **Identification and Authentication Failures**
   - Previously "Broken Authentication." Includes failures related to user identification, authentication, and session management.

8. **Software and Data Integrity Failures**
   - New category. Focuses on assumptions related to software updates, critical data, and CI/CD pipelines without verifying integrity. Insecure deserialization is now part of this category.

9. **Security Logging and Monitoring Failures**
   - Previously "Insufficient Logging & Monitoring." Expanded to include more types of failures that impact visibility, incident alerting, and forensics.

10. **Server-Side Request Forgery (SSRF)**
    - New category. Occurs when a web application fetches a remote resource without validating the user-supplied URL, allowing attackers to coerce the application to send requests to unintended destinations.

For more details, visit the [OWASP Top Ten Project](https://owasp.org/www-project-top-ten/).
