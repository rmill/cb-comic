<?php /** * The template for displaying the footer. * * Contains the closing of the #content div and all content after * * @package SKT Naturolite */ ?>

<?php wp_footer(); ?>

<script src="//s3.amazonaws.com/downloads.mailchimp.com/js/mc-validate.js" type="text/javascript"></script>
<script type="text/javascript">
    // <![CDATA[
    (function($) {
        window.fnames = new Array();
        window.ftypes = new Array();
        fnames[0] = 'EMAIL';
        ftypes[0] = 'email';
        fnames[1] = 'FNAME';
        ftypes[1] = 'text';
        fnames[2] = 'LNAME';
        ftypes[2] = 'text';
    }(jQuery));
    var $mcj = jQuery.noConflict(true);
    // ]]>
</script>


<div class="footer">
    <div>Stay Informed! Sign up for our Newsletter</div>
    <br />
    <div id="mc_embed_signup">
        <form id="mc-embedded-subscribe-form" class="validate" action="//katelarking.us8.list-manage.com/subscribe/post?u=ac808854fde53d30e6192cf28&amp;id=21b1f43ac2" method="post" name="mc-embedded-subscribe-form" novalidate="" target="_blank">
            <div id="mc_embed_signup_scroll">
                <div class="mc-field-group">
                    <label for="mce-EMAIL">Email Address <span class="asterisk">*</span>
                    </label>
                    <input id="mce-EMAIL" class="required email" name="EMAIL" type="email" value="" />
                </div>
                <div class="mc-field-group">
                    <label for="mce-FNAME">First Name </label>
                    <input id="mce-FNAME" class="" name="FNAME" type="text" value="" />
                </div>
                <div class="mc-field-group">
                    <label for="mce-LNAME">Last Name </label>
                    <input id="mce-LNAME" class="" name="LNAME" type="text" value="" />
                </div>
                <div id="mce-responses" class="clear"></div>
                <?php /* do not remove this or risk form bot signups */ ?>
                <div style="position: absolute; left: -5000px;">
                    <input tabindex="-1" name="b_ac808854fde53d30e6192cf28_21b1f43ac2" type="text" value="" />
                </div>
                <div class="mc-submit">
                    <input id="mc-embedded-subscribe" class="btn" name="subscribe" type="submit" value="Subscribe" />
		    <label class="indicates-required"><span class="asterisk">*</span> indicates required</label>
                </div>
            </div>
        </form>
    </div>
    
    <h4 style="margin-top: 26px;">Crash and Burn © 2015 Finn Lucullan and Kate Larking</h4>

</div>

</body>

</html>