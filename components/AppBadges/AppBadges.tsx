export function AppBadges() {
    return (
    <div className="flex items-center">
  <a href='https://apps.apple.com/us/app/dawn-health/id1487849164?itsct=apps_box_badge&amp;itscg=30200'>
    <img 
      className="w-[167px]"
      src='https://tools.applemediaservices.com/api/badges/download-on-the-app-store/black/en-us?size=250x83&amp;releaseDate=1581120000&h=26941ead3b0b512572d4656e98f15fc9' 
      alt='Download on the App Store'/>
  </a>
  <a href='https://play.google.com/store/apps/details?id=com.sleepedy.sleepedy&pcampaignid=pcampaignidMKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1'>
    <img 
      className="w-[185px] h-[81px]"
      alt='Get it on Google Play' 
      src='https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png' />
  </a>
</div>
    )
  }