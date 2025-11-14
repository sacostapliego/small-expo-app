import { useColorScheme } from '@/hooks/use-color-scheme';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Image } from 'expo-image';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SearchScreen() {
  const colorScheme = useColorScheme();
  const backgroundColor = colorScheme === 'dark' ? '#1c1c1e' : '#f2f2f7';
  const [searchText, setSearchText] = useState('Carrots');
  const [selectedFilters, setSelectedFilters] = useState<number[]>([]);

  const mockResults = [
    { 
      id: 1, 
      vendorName: 'Azalea Fresh Market',
      posted: '1 day ago',
      distance: '4 mins away',
      imageUrl: 'https://scontent-atl3-3.xx.fbcdn.net/v/t51.82787-15/539434152_18526632556011418_7684585295959076111_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=127cfc&_nc_ohc=FdKf-vaFx-oQ7kNvwHLmJGr&_nc_oc=Adl5I2ZHybYe4324N6-HM10mLWQAdiRibs3S0gONDiTMBGjit9cEV5nssJyEtGF7N8w&_nc_zt=23&_nc_ht=scontent-atl3-3.xx&_nc_gid=cLx673mAWs3DZ36UR43Meg&oh=00_AfgFQcQCGTcAZ2yqDa93ctJs34Z3zlDJMccRodbDncmWFw&oe=691D2E65'
    },
    { 
      id: 2, 
      vendorName: 'AZN (Simple. Seasonal. Healthy) Bubble Tea. Fresh Juice & Bowls',
      posted: '2 days ago',
      distance: '2 mins away',
      imageUrl: "https://theavotree.co.nz/wp-content/uploads/2022/05/Screen-Shot-2022-05-03-at-1.19.14-PM.png"
    },
  ];

  const filters = [
    { id: 1, label: 'Organic' },
    { id: 2, label: 'Within 5 miles' },
    { id: 3, label: 'Posted this week' },
  ];

  const toggleFilter = (id: number) => {
    setSelectedFilters(prev => 
      prev.includes(id) 
        ? prev.filter(filterId => filterId !== id)
        : [...prev, id]
    );
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor }]} edges={['bottom']}>
      <View style={[styles.container, { backgroundColor }]}>
        {/* Search Bar */}
        <View style={styles.searchBarContainer}>
          <View style={[styles.searchBar, { backgroundColor: colorScheme === 'dark' ? 'rgba(30, 30, 30, 1)' : '#e6e5eb' }]}>
            <FontAwesome name="search" size={20} color="#999" style={styles.searchIcon} />
            <TextInput
              style={[styles.searchInput, { 
                backgroundColor: colorScheme === 'dark' ? 'rgba(40, 40, 40, 1)' : '#fff',
                color: colorScheme === 'dark' ? '#fff' : '#000'
              }]}
              placeholder="Search for produce..."
              placeholderTextColor="#999"
              value={searchText}
              onChangeText={setSearchText}
            />
            <Pressable 
              style={styles.searchButton}
              onPress={() => {/* Demo - no action */}}
            >
              <Text style={styles.searchButtonText}>Search</Text>
            </Pressable>
          </View>
        </View>

        {/* Results Header */}
        <View style={styles.resultsHeaderContainer}>
          <View style={[styles.resultsHeader, { backgroundColor: colorScheme === 'dark' ? 'rgba(30, 30, 30, 1)' : '#e6e5eb' }]}>
            <Text style={[styles.resultsText, { color: colorScheme === 'dark' ? '#fff' : '#000' }]}>
              Found {mockResults.length} results for "{searchText}"
            </Text>
          </View>
        </View>

        {/* Filters */}
        <View style={[styles.filtersSection, { backgroundColor }]}>
          <Text style={[styles.filtersTitle, { color: colorScheme === 'dark' ? '#999' : '#666' }]}>Filters</Text>
          <View style={styles.filtersContainer}>
            {filters.map((filter) => (
              <Pressable
                key={filter.id}
                style={[
                  styles.filterChip,
                  { backgroundColor: colorScheme === 'dark' ? 'rgba(30, 30, 30, 1)' : '#e6e5eb' },
                  selectedFilters.includes(filter.id) && styles.filterChipActive
                ]}
                onPress={() => toggleFilter(filter.id)}
              >
                <Text style={[
                  styles.filterChipText,
                  { color: colorScheme === 'dark' ? '#999' : '#666' },
                  selectedFilters.includes(filter.id) && styles.filterChipTextActive
                ]}>
                  {filter.label}
                </Text>
                {selectedFilters.includes(filter.id) && (
                  <FontAwesome name="check" size={12} color="#225832" style={styles.checkIcon} />
                )}
              </Pressable>
            ))}
          </View>
        </View>

        {/* Results List */}
        <ScrollView style={styles.resultsContainer} showsVerticalScrollIndicator={false}>
          {mockResults.map((item) => (
            <Pressable 
              key={item.id} 
              style={[styles.resultCard, { backgroundColor: colorScheme === 'dark' ? 'rgba(30, 30, 30, 1)' : '#e6e5eb' }]}
              onPress={() => {/* Demo - no action */}}
            >
              {item.imageUrl ? (
                <Image
                  source={{ uri: item.imageUrl }}
                  style={styles.productImage}
                />
              ) : (
                <View style={styles.imagePlaceholder}>
                  <FontAwesome name="image" size={32} color="#666" />
                </View>
              )}
              <View style={styles.resultInfo}>
                <Text style={[styles.vendorName, { color: colorScheme === 'dark' ? '#fff' : '#000' }]}>{item.vendorName}</Text>
                <View style={styles.metaRow}>
                  <View style={styles.metaItem}>
                    <FontAwesome name="clock-o" size={11} color="#999" />
                    <Text style={styles.metaText}>{item.posted}</Text>
                  </View>
                  <View style={styles.metaItem}>
                    <FontAwesome name="map-marker" size={11} color="#999" />
                    <Text style={styles.metaText}>{item.distance}</Text>
                  </View>
                </View>
              </View>
              <FontAwesome name="chevron-right" size={16} color="#666" style={styles.chevron} />
            </Pressable>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  searchBarContainer: {
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderRadius: 12,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 8,
    fontSize: 15,
  },
  searchButton: {
    marginLeft: 8,
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#225832',
    borderRadius: 8,
  },
  searchButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
  resultsHeaderContainer: {
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  resultsHeader: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderRadius: 12,
  },
  resultsText: {
    fontSize: 16,
    fontWeight: '600',
  },
  filtersSection: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  filtersTitle: {
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  filtersContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  filterChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
  },
  filterChipActive: {
    // Keep the same background for active state
  },
  filterChipText: {
    fontSize: 13,
    fontWeight: '500',
  },
  filterChipTextActive: {
    color: '#225832',
    fontWeight: '600',
  },
  checkIcon: {
    marginLeft: 6,
  },
  resultsContainer: {
    flex: 1,
    padding: 16,
  },
  resultCard: {
    flexDirection: 'row',
    padding: 14,
    marginBottom: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  imagePlaceholder: {
    width: 80,
    height: 80,
    backgroundColor: 'rgba(40, 40, 40, 1)',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  resultInfo: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'center',
  },
  vendorName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  metaRow: {
    flexDirection: 'row',
    gap: 12,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaText: {
    fontSize: 12,
    color: '#999',
  },
  chevron: {
    alignSelf: 'center',
  },
});