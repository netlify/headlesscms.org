// ES6 code goes here

let listControlState = {
  filters: {
    cmsType: "",
    supportedGenerator: "",
    openSource: "",
  },
  sortBy: "",
};

const getFilterFunction = filters =>
  function() {
    const $this = $(this);

    if (filters.openSource === "" && $this.hasClass("cards-header")) {
      return true;
    } else if ($this.hasClass("cards-header")) {
      return false;
    }

    if ($this.hasClass("staticgen-promo")) {
      return true;
    }

    if (filters.cmsType !== "" && filters.cmsType !== $this.data("typeofcms")) {
      return false;
    }

    const supportedGenerators = $this
      .data("supportedgenerators")
      .split(",")
      .map(s => s.toLowerCase());
    if (
      !(
        filters.supportedGenerator === "" ||
        supportedGenerators.includes("all") ||
        supportedGenerators.includes(filters.supportedGenerator.toLowerCase())
      )
    ) {
      return false;
    }

    if (
      filters.openSource !== "" &&
      filters.openSource !== $this.data("opensource")
    ) {
      return false;
    }

    return true;
  };

const refilterOnSelectChange = (selector, getNewFiltersFromValue) => {
  $(selector).change(function(e) {
    console.log($(this).val());
    const newFilters = getNewFiltersFromValue(
      listControlState.filters,
      $(this).val(),
    );
    listControlState.filters = newFilters;
    refilter(newFilters);
  });
};

const refilter = filters => {
  $(".projects").isotope({ filter: getFilterFunction(filters) });
};

$(document).ready(() => {
  $('.landing .card').matchHeight();

  $(".card .description").each(function() {
    if ($(this).height() > 66) {
      $(this).addClass("too-long");
    }
  });

  const share = new Share("#share-button-top", {
    networks: {
      facebook: {
        app_id: "1604147083144211",
      }
    }
  });

  // This is still buggy and just a band-aid
  $(window).on('resize', function(){
    $('.navbar').attr('style', '').removeData('pin');
    $('.navbar').pin({
      minWidth: 500
    });
  });

  $(".projects").isotope({
    layoutMode: "fitRows",
    getSortData: {
      stars: "[data-stars] parseInt",
      followers: "[data-followers] parseInt",
      title: "[data-title]",
    },
  });

  refilterOnSelectChange("select[name='filter-by-type']", (filters, value) =>
    Object.assign({}, filters, { cmsType: value }),
  );
  refilterOnSelectChange(
    "select[name='filter-by-generator']",
    (filters, value) =>
      Object.assign({}, filters, { supportedGenerator: value }),
  );
  refilterOnSelectChange(
    "select[name='filter-by-open-source']",
    (filters, value) => Object.assign({}, filters, { openSource: value }),
  );

  $("select[name='sort']").change(function(e) {
    const val = $(this).val();
    console.log(val);
    if (val === "stars") {
      $(".projects").addClass("show-headers");
    } else {
      $(".projects").removeClass("show-headers");
    }
    $(".projects").isotope({
      sortBy: [val, "title"],
      sortAscending: {
        title: true,
        stars: false,
        followers: false,
      },
    });
  });
  // sort on load
  $("select[name='sort']").change();
});
