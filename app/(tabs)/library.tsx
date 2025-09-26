import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  Dimensions,
} from 'react-native';
import {
  Search,
  Filter,
  Leaf,
  Bug,
  Droplets,
  Sun,
  ChevronRight,
  AlertTriangle,
  Info,
} from 'lucide-react-native';

const { width } = Dimensions.get('window');

export default function LibraryScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'Todas', icon: Leaf, color: '#059669' },
    { id: 'diseases', name: 'Doenças', icon: Bug, color: '#DC2626' },
    { id: 'deficiencies', name: 'Deficiências', icon: Droplets, color: '#D97706' },
    { id: 'pests', name: 'Pragas', icon: AlertTriangle, color: '#7C3AED' },
  ];

  const diseases = [
    {
      id: 1,
      name: 'Mancha Parda',
      scientificName: 'Alternaria solani',
      category: 'diseases',
      severity: 'Alta',
      plants: ['Tomate', 'Batata', 'Berinjela'],
      image: 'https://images.pexels.com/photos/1327838/pexels-photo-1327838.jpeg',
      description: 'Doença fúngica que causa manchas escuras nas folhas, reduzindo a produtividade.',
      symptoms: [
        'Manchas circulares escuras nas folhas',
        'Anéis concêntricos nas lesões',
        'Amarelecimento das folhas afetadas',
        'Queda prematura das folhas'
      ],
      treatment: [
        'Aplicação de fungicidas específicos',
        'Remoção das folhas infectadas',
        'Melhoria da ventilação',
        'Controle da umidade'
      ],
      prevention: 'Rotação de culturas, manejo da irrigação e uso de variedades resistentes.'
    },
    {
      id: 2,
      name: 'Deficiência de Nitrogênio',
      scientificName: 'N Deficiency',
      category: 'deficiencies',
      severity: 'Moderada',
      plants: ['Milho', 'Trigo', 'Arroz'],
      image: 'https://images.pexels.com/photos/547263/pexels-photo-547263.jpeg',
      description: 'Falta de nitrogênio essencial para o crescimento e desenvolvimento das plantas.',
      symptoms: [
        'Amarelecimento das folhas mais velhas',
        'Crescimento lento da planta',
        'Folhas pequenas e pálidas',
        'Redução na produção de frutos'
      ],
      treatment: [
        'Aplicação de fertilizantes nitrogenados',
        'Adubação orgânica com compost',
        'Correção do pH do solo',
        'Irrigação adequada para absorção'
      ],
      prevention: 'Análise regular do solo e programa de adubação balanceada.'
    },
    {
      id: 3,
      name: 'Pulgão Verde',
      scientificName: 'Myzus persicae',
      category: 'pests',
      severity: 'Moderada',
      plants: ['Pêssego', 'Batata', 'Pimentão'],
      image: 'https://images.pexels.com/photos/1105766/pexels-photo-1105766.jpeg',
      description: 'Inseto sugador que se alimenta da seiva das plantas e transmite vírus.',
      symptoms: [
        'Pequenos insetos verdes nas folhas',
        'Folhas enroladas ou deformadas',
        'Presença de melada (substância pegajosa)',
        'Crescimento lento da planta'
      ],
      treatment: [
        'Aplicação de inseticidas específicos',
        'Controle biológico com joaninhas',
        'Remoção manual em pequenas infestações',
        'Uso de sabão inseticida'
      ],
      prevention: 'Monitoramento regular, controle de formigas e manejo integrado de pragas.'
    },
    {
      id: 4,
      name: 'Oídio',
      scientificName: 'Podosphaera xanthii',
      category: 'diseases',
      severity: 'Alta',
      plants: ['Pepino', 'Abobrinha', 'Melão'],
      image: 'https://images.pexels.com/photos/1300510/pexels-photo-1300510.jpeg',
      description: 'Doença fúngica caracterizada por um pó branco sobre as folhas.',
      symptoms: [
        'Manchas brancas pulverulentas nas folhas',
        'Deformação das folhas afetadas',
        'Redução da fotossíntese',
        'Queda na produtividade'
      ],
      treatment: [
        'Aplicação de fungicidas sistêmicos',
        'Uso de bicarbonato de sódio',
        'Melhoria da circulação de ar',
        'Remoção das partes afetadas'
      ],
      prevention: 'Espaçamento adequado entre plantas e controle da umidade.'
    }
  ];

  const filteredDiseases = diseases.filter(disease => {
    const matchesSearch = disease.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         disease.scientificName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || disease.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'Alta': return '#EF4444';
      case 'Moderada': return '#F59E0B';
      case 'Baixa': return '#22C55E';
      default: return '#6B7280';
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Biblioteca de Doenças</Text>
        <Text style={styles.headerSubtitle}>
          Conhecimento completo sobre problemas das plantas
        </Text>
      </View>

      {/* Search */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBox}>
          <Search size={20} color="#9CA3AF" />
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar doenças, pragas ou deficiências..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        <TouchableOpacity style={styles.filterButton}>
          <Filter size={20} color="#6B7280" />
        </TouchableOpacity>
      </View>

      {/* Categories */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.categoriesContainer}
        contentContainerStyle={styles.categoriesContent}
      >
        {categories.map((category) => {
          const isSelected = selectedCategory === category.id;
          return (
            <TouchableOpacity
              key={category.id}
              style={[
                styles.categoryButton,
                isSelected && { backgroundColor: category.color + '20' }
              ]}
              onPress={() => setSelectedCategory(category.id)}
            >
              <category.icon 
                size={20} 
                color={isSelected ? category.color : '#6B7280'} 
              />
              <Text style={[
                styles.categoryText,
                isSelected && { color: category.color }
              ]}>
                {category.name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* Disease List */}
      <ScrollView style={styles.listContainer} showsVerticalScrollIndicator={false}>
        {filteredDiseases.map((disease) => (
          <TouchableOpacity key={disease.id} style={styles.diseaseCard}>
            <Image source={{ uri: disease.image }} style={styles.diseaseImage} />
            
            <View style={styles.diseaseContent}>
              <View style={styles.diseaseHeader}>
                <Text style={styles.diseaseName}>{disease.name}</Text>
                <View style={[
                  styles.severityBadge, 
                  { backgroundColor: getSeverityColor(disease.severity) + '20' }
                ]}>
                  <Text style={[
                    styles.severityText, 
                    { color: getSeverityColor(disease.severity) }
                  ]}>
                    {disease.severity}
                  </Text>
                </View>
              </View>
              
              <Text style={styles.scientificName}>{disease.scientificName}</Text>
              
              <Text style={styles.description} numberOfLines={2}>
                {disease.description}
              </Text>
              
              <View style={styles.plantsContainer}>
                <Text style={styles.plantsLabel}>Afeta: </Text>
                <Text style={styles.plantsText}>
                  {disease.plants.join(', ')}
                </Text>
              </View>
              
              <View style={styles.symptomsPreview}>
                <Info size={14} color="#6B7280" />
                <Text style={styles.symptomsText}>
                  {disease.symptoms.length} sintomas identificados
                </Text>
              </View>
            </View>
            
            <ChevronRight size={20} color="#D1D5DB" />
          </TouchableOpacity>
        ))}
        
        <View style={styles.bottomSpacer} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    backgroundColor: '#FFFFFF',
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#6B7280',
  },
  searchContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    alignItems: 'center',
    gap: 12,
  },
  searchBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: '#111827',
  },
  filterButton: {
    width: 44,
    height: 44,
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoriesContainer: {
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  categoriesContent: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  categoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 12,
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6B7280',
    marginLeft: 8,
  },
  listContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  diseaseCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'flex-start',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  diseaseImage: {
    width: 80,
    height: 80,
    borderRadius: 12,
    marginRight: 16,
  },
  diseaseContent: {
    flex: 1,
  },
  diseaseHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  diseaseName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
    flex: 1,
  },
  severityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    marginLeft: 8,
  },
  severityText: {
    fontSize: 12,
    fontWeight: '600',
  },
  scientificName: {
    fontSize: 13,
    fontStyle: 'italic',
    color: '#6B7280',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#374151',
    lineHeight: 20,
    marginBottom: 8,
  },
  plantsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 8,
  },
  plantsLabel: {
    fontSize: 13,
    fontWeight: '500',
    color: '#6B7280',
  },
  plantsText: {
    fontSize: 13,
    color: '#374151',
    flex: 1,
  },
  symptomsPreview: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  symptomsText: {
    fontSize: 12,
    color: '#6B7280',
    marginLeft: 4,
  },
  bottomSpacer: {
    height: 20,
  },
});