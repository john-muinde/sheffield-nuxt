<!-- DynamicFilter.vue -->
<template>
  <div v-if="filters.length" class="filter-container">
    <h4 class="filter-heading">
      <span class="filter-icon">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z"
            clip-rule="evenodd"
          />
        </svg>
      </span>
      {{ formatTitle(filterColumn) }}
    </h4>
    <div class="filter-options-container" :class="props.classes">
      <label
        v-for="(value, index) in filters"
        :key="value"
        class="filter-card"
        :class="{ 'filter-card-selected': selectedFilters.includes(value) }"
      >
        <input
          v-model="selectedFilters"
          type="checkbox"
          :value="value"
          class="filter-checkbox"
          @change="handleFilterChange"
        />
        <div class="filter-content">
          <div class="checkbox-wrapper">
            <div
              class="custom-checkbox"
              :class="{ checked: selectedFilters.includes(value) }"
            >
              <svg
                v-if="selectedFilters.includes(value)"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                class="checkmark"
              >
                <path
                  fill-rule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
            <span class="filter-label">{{ titles[index] }}</span>
          </div>
          <span v-if="showNumbers" class="filter-count">{{
            getCount(value)
          }}</span>
        </div>
      </label>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';

const emit = defineEmits(['update:displayedProducts']);

const props = defineProps({
  items: {
    type: Array,
    required: true,
  },
  filterColumn: {
    type: String,
    required: true,
  },
  filters: {
    type: Array,
    required: false,
    default: () => [],
  },
  selectedFilters: {
    type: Array,
    required: false,
    default: () => [],
  },
  showNumbers: {
    type: Boolean,
    default: false,
  },
  searchTerm: {
    type: String,
    default: '',
  },
  classes: {
    type: String,
    default: '',
  },
});

const selectedFilters = ref(props.selectedFilters);
const showNumbers = ref(props.showNumbers);
const dataRef = ref(props.items);
const searchTerm = ref(props.searchTerm);

const filters = ref([]);
const titles = ref([]);

if (props.filters.length > 0) {
  if (typeof props.filters[0] === 'object') {
    filters.value = props.filters.map((filter) => Object.keys(filter)[0]);
    titles.value = props.filters.map((filter) => Object.values(filter)[0]);
  } else {
    filters.value = props.filters;
    titles.value = props.filters;
  }
}

const uniqueValues = computed(() => {
  if (filters.value.length) return filters.value;
  if (!props.items?.length && !filters.value?.length && !props.filterColumn)
    return [];
  if (!props.items?.length || !props.filterColumn) return [];

  filters.value = [
    ...new Set(
      props.items.map((item) => item[props.filterColumn]).filter(Boolean),
    ),
  ].sort();
  titles.value = filters.value;
});

const getCount = (value) => {
  return props.items.filter((item) => item[props.filterColumn] === value)
    .length;
};

const formatTitle = (column) => {
  return column
    .split('_')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

const handleFilterChange = () => {
  if (selectedFilters.value.length === 0) {
    dataRef.value = props.items;
  } else {
    dataRef.value = props.items.filter((item) =>
      selectedFilters.value.includes(item[props.filterColumn]),
    );
  }

  // try to search for the search term using name, description, and tags, if not then filtercolumn
  if (searchTerm.value) {
    dataRef.value = dataRef.value.filter(
      (item) =>
        item.name?.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
        item.description
          ?.toLowerCase()
          .includes(searchTerm.value.toLowerCase()) ||
        item.tags?.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
        item[props.filterColumn]
          .toLowerCase()
          .includes(searchTerm.value.toLowerCase()),
    );
  }

  emit('update:displayedProducts', {
    filteredData: dataRef.value,
    selectedFilters: selectedFilters.value,
  });
};

watch(
  () => props.searchTerm,
  (newSearchTerm) => {
    searchTerm.value = newSearchTerm;
    handleFilterChange();
  },
);

// Modified watch that preserves filters
watch(
  () => props.items,
  (newItems) => {
    dataRef.value = newItems;

    // Apply existing filters to new items
    if (selectedFilters.value.length > 0) {
      const filteredData = newItems.filter((item) =>
        selectedFilters.value.includes(item[props.filterColumn]),
      );

      emit('update:displayedProducts', {
        filteredData,
        selectedFilters: selectedFilters.value,
      });
    } else {
      // If no filters are selected, show all items
      emit('update:displayedProducts', {
        filteredData: newItems,
        selectedFilters: [],
      });
    }
  },
  { deep: true },
);
</script>

<style scoped>
.filter-container {
  background-color: #ffffff;
  border-radius: 1rem;
  padding: 1.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  border: 1px solid #f0f0f0;
}

.filter-heading {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.6rem;
  font-weight: 600;
  color: #1a1a1a;
  margin-bottom: 1.25rem;
}

.filter-icon {
  color: #6366f1;
  display: flex;
  align-items: center;
}

.filter-options-container {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.filter-card {
  position: relative;
  display: block;
  background-color: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 0.75rem;
  transition: all 0.2s ease;
  cursor: pointer;
}

.filter-card:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  border-color: #6366f1;
}

.filter-card-selected {
  background-color: #f5f5ff;
  border-color: #6366f1;
}

.filter-checkbox {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

.filter-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 1rem;
}

.checkbox-wrapper {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.custom-checkbox {
  width: 1.25rem;
  height: 1.25rem;
  border: 2px solid #d1d5db;
  border-radius: 0.375rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.custom-checkbox.checked {
  background-color: #6366f1;
  border-color: #6366f1;
}

.checkmark {
  width: 0.875rem;
  height: 0.875rem;
  color: white;
}

.filter-label {
  font-size: 1.5rem;
  color: #374151;
  font-weight: 500;
}

.filter-count {
  background-color: #f3f4f6;
  padding: 0.25rem 0.5rem;
  border-radius: 1rem;
  font-size: 1.5rem;
  color: #6b7280;
  font-weight: 500;
}

.filter-card-selected .filter-count {
  background-color: #e0e7ff;
  color: #6366f1;
}

@keyframes checkmark {
  0% {
    transform: scale(0);
  }

  50% {
    transform: scale(1.2);
  }

  100% {
    transform: scale(1);
  }
}

.checkmark {
  animation: checkmark 0.2s ease-in-out;
}
</style>
