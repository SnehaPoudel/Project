export const getCountryOptionsV2 = (countryList = []) => {
    return countryList.map((country) => ({
      key: country.identifier,
      label: country.name,
      icon: (
        <div className="border rounded-full">
          <img
            src={country.flagUrl || '/images/default-profile-picture.svg'}
            alt={`Flag of ${country.name}`}
            className="h-6 w-6 rounded-full object-cover"
            style={{
              border: '1px solid #D7DADC',
            }}
          ></img>
        </div>
      ),
      subtitle: country.identifier,
    }));
  };