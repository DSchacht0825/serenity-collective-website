<!-- Email Signup Form -->
  <section class="email-signup-section" 
  id="signup-form">
      <div class="email-signup-form">
          <h3>Join Our Community</h3>
          <p class="form-description">Stay connected
  with our progress and be the first to know about pilot
   groups, events, and ways to get involved in this
  transformative ministry.</p>

          <form name="email-signup" method="POST" 
  data-netlify="true" class="brevo-signup-form">
              <input type="hidden" name="form-name" 
  value="email-signup" />
              <div class="signup-form-grid">
                  <div class="form-group">
                      <label for="first-name" 
  class="required">First Name</label>
                      <input type="text" id="first-name"
   name="firstName" required>
                  </div>
                  <div class="form-group">
                      <label for="last-name" 
  class="required">Last Name</label>
                      <input type="text" id="last-name" 
  name="lastName" required>
                  </div>
                  <div class="form-group full-width">
                      <label for="email" 
  class="required">Email Address</label>
                      <input type="email" id="email" 
  name="email" required>
                  </div>
                  <div class="form-group">
                      <label for="city" 
  class="optional">City</label>
                      <input type="text" id="city" 
  name="city">
                  </div>
                  <div class="form-group">
                      <label for="state" 
  class="optional">State/ZIP</label>
                      <input type="text" id="state" 
  name="state" placeholder="CA or 90210">
                  </div>
                  <div class="form-group full-width">
                      <label for="phone" 
  class="optional">Phone Number</label>
                      <input type="tel" id="phone" 
  name="phone" placeholder="(619) 300-8337">
                  </div>
              </div>

              <div class="interests-group">
                  <label class="form-label">I'm
  interested in: (Check all that apply)</label>
                  <div class="interests-grid">
                      <div class="checkbox-item">
                          <input type="checkbox" 
  id="pilot-group" name="interests" value="pilot_group">
                          <label 
  for="pilot-group">Joining a Pilot Group</label>
                      </div>
                      <div class="checkbox-item">
                          <input type="checkbox" 
  id="volunteering" name="interests" 
  value="volunteering">
                          <label 
  for="volunteering">Volunteering</label>
                      </div>
                      <div class="checkbox-item">
                          <input type="checkbox" 
  id="supporting" name="interests" value="supporting">
                          <label 
  for="supporting">Financial Support</label>
                      </div>
                      <div class="checkbox-item">
                          <input type="checkbox" 
  id="updates" name="interests" value="updates">
                          <label for="updates">Ministry
  Updates</label>
                      </div>
                      <div class="checkbox-item">
                          <input type="checkbox" 
  id="prayer" name="interests" value="prayer">
                          <label for="prayer">Prayer
  Support</label>
                      </div>
                      <div class="checkbox-item">
                          <input type="checkbox" 
  id="events" name="interests" value="events">
                          <label for="events">Events &
  Training</label>
                      </div>
                  </div>
              </div>

              <div class="privacy-notice">
                  By submitting this form, you agree to
  receive emails from Serenity Collective. You can
  unsubscribe at any time. We respect your privacy and
  will never share your information.
              </div>

              <button type="submit" 
  class="signup-submit-btn">Join Our Community</button>
          </form>
      </div>
  </section>
