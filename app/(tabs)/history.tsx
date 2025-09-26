import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import {
  Calendar,
  MapPin,
  CheckCircle,
  AlertTriangle,
  Filter,
  Search,
  TrendingUp,
  BarChart3,
} from 'lucide-react-native';

const { width } = Dimensions.get('window');

export default function HistoryScreen() {
  const [selectedFilter, setSelectedFilter] = useState('all');

  const filters = [
    { id: 'all', name: 'Todas', count: 24 },
    { id: 'healthy', name: 'Saudáveis', count: 18 },
    { id: 'diseased', name: 'Com problemas', count: 6 },
  ];

  const analyses = [
    {
      id: 1,
      date: '2025-01-20',
      time: '14:30',
      plant: 'Tomate',
      result: 'Mancha Parda',
      severity: 'Moderada',
      confidence: 89,
      location: 'Plantação Norte',
      image: 'https://images.pexels.com/photos/1327838/pexels-photo-1327838.jpeg',
      status: 'diseased',
      treated: false,
    },
    {
      id: 2,
      date: '2025-01-20',
      time: '09:15',
      plant: 'Milho',
      result: 'Planta Saudável',
      severity: 'Nenhuma',
      confidence: 95,
      location: 'Setor B',
      image: 'https://images.pexels.com/photos/547263/pexels-photo-547263.jpeg',
      status: 'healthy',
      treated: null,
    },
    {
      id: 3,
      date: '2025-01-19',
      time: '16:45',
      plant: 'Pepino',
      result: 'Oídio',
      severity: 'Alta',
      confidence: 92,
      location: 'Estufa 3',
      image: 'https://images.pexels.com/photos/1300510/pexels-photo-1300510.jpeg',
      status: 'diseased',
      treated: true,
    },
    {
      id: 4,
      date: '2025-01-19',
      time: '11:20',
      plant: 'Alface',
      result: 'Planta Saudável',
      severity: 'Nenhuma',
      confidence: 97,
      location: 'Plantação Sul',
      image: 'https://images.pexels.com/photos/1105766/pexels-photo-1105766.jpeg',
      status: 'healthy',
      treated: null,
    },
    {
      id: 5,
      date: '2025-01-18',
      time: '13:10',
      plant: 'Pimentão',
      result: 'Deficiência de Nitrogênio',
      severity: 'Moderada',
      confidence: 87,
      location: 'Setor A',
      image: 'https://images.pexels.com/photos/1327838/pexels-photo-1327838.jpeg',
      status: 'diseased',
      treated: true,
    },
  ];

  const filteredAnalyses = analyses.filter(analysis => 
    selectedFilter === 'all' || analysis.status === selectedFilter
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy': return '#059669';
      case 'diseased': return '#DC2626';
      default: return '#6B7280';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'Alta': return '#DC2626';
      case 'Moderada': return '#D97706';
      case 'Baixa': return '#059669';
      case 'Nenhuma': return '#059669';
      default: return '#6B7280';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Hoje';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Ontem';
    } else {
      return date.toLocaleDateString('pt-BR', { 
        day: '2-digit', 
        month: 'short' 
      });
    }
  };

  const stats = [
    { 
      label: 'Total de análises', 
      value: analyses.length.toString(),
      icon: BarChart3,
      color: '#059669',
    },
    { 
      label: 'Taxa de sucesso', 
      value: '92%',
      icon: TrendingUp,
      color: '#10B981',
    },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Histórico de Análises</Text>
        <Text style={styles.headerSubtitle}>
          Acompanhe todas as suas análises anteriores
        </Text>
      </View>

      {/* Stats */}
      <View style={styles.statsContainer}>
        {stats.map((stat, index) => (
          <View key={index} style={styles.statCard}>
            <View style={[styles.statIcon, { backgroundColor: stat.color + '20' }]}>
              <stat.icon size={20} color={stat.color} />
            </View>
            <Text style={styles.statValue}>{stat.value}</Text>
            <Text style={styles.statLabel}>{stat.label}</Text>
          </View>
        ))}
      </View>

      {/* Filters */}
      <View style={styles.filtersContainer}>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filtersContent}
        >
          {filters.map((filter) => {
            const isSelected = selectedFilter === filter.id;
            return (
              <TouchableOpacity
                key={filter.id}
                style={[
                  styles.filterButton,
                  isSelected && styles.filterButtonSelected
                ]}
                onPress={() => setSelectedFilter(filter.id)}
              >
                <Text style={[
                  styles.filterText,
                  isSelected && styles.filterTextSelected
                ]}>
                  {filter.name}
                </Text>
                <View style={[
                  styles.filterBadge,
                  isSelected && styles.filterBadgeSelected
                ]}>
                  <Text style={[
                    styles.filterBadgeText,
                    isSelected && styles.filterBadgeTextSelected
                  ]}>
                    {filter.count}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* Analysis List */}
      <ScrollView style={styles.listContainer} showsVerticalScrollIndicator={false}>
        {filteredAnalyses.map((analysis, index) => (
          <TouchableOpacity key={analysis.id} style={styles.analysisCard}>
            <View style={styles.analysisHeader}>
              <View style={styles.dateContainer}>
                <Text style={styles.dateText}>{formatDate(analysis.date)}</Text>
                <Text style={styles.timeText}>{analysis.time}</Text>
              </View>
              
              <View style={[
                styles.statusIndicator,
                { backgroundColor: getStatusColor(analysis.status) }
              ]} />
            </View>

            <View style={styles.analysisContent}>
              <Image source={{ uri: analysis.image }} style={styles.analysisImage} />
              
              <View style={styles.analysisDetails}>
                <Text style={styles.plantName}>{analysis.plant}</Text>
                <Text style={[
                  styles.resultText,
                  { color: getStatusColor(analysis.status) }
                ]}>
                  {analysis.result}
                </Text>
                
                <View style={styles.analysisInfo}>
                  <View style={styles.infoItem}>
                    <Text style={styles.infoLabel}>Confiança: </Text>
                    <Text style={styles.infoValue}>{analysis.confidence}%</Text>
                  </View>
                  
                  <View style={styles.infoItem}>
                    <Text style={styles.infoLabel}>Severidade: </Text>
                    <Text style={[
                      styles.infoValue,
                      { color: getSeverityColor(analysis.severity) }
                    ]}>
                      {analysis.severity}
                    </Text>
                  </View>
                </View>
                
                <View style={styles.locationContainer}>
                  <MapPin size={14} color="#9CA3AF" />
                  <Text style={styles.locationText}>{analysis.location}</Text>
                </View>
              </View>
            </View>

            {analysis.status === 'diseased' && (
              <View style={styles.treatmentStatus}>
                {analysis.treated ? (
                  <View style={styles.treatedContainer}>
                    <CheckCircle size={16} color="#22C55E" />
                    <Text style={styles.treatedText}>Tratamento aplicado</Text>
                  </View>
                ) : (
                  <View style={styles.untreatedContainer}>
                    <AlertTriangle size={16} color="#F59E0B" />
                    <Text style={styles.untreatedText}>Aguardando tratamento</Text>
                  </View>
                )}
              </View>
            )}
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
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 20,
    gap: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  statCard: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  statIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  statValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
  },
  filtersContainer: {
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  filtersContent: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 12,
  },
  filterButtonSelected: {
    backgroundColor: '#22C55E20',
  },
  filterText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6B7280',
    marginRight: 8,
  },
  filterTextSelected: {
    color: '#22C55E',
  },
  filterBadge: {
    backgroundColor: '#E5E7EB',
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  filterBadgeSelected: {
    backgroundColor: '#22C55E',
  },
  filterBadgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6B7280',
  },
  filterBadgeTextSelected: {
    color: '#FFFFFF',
  },
  listContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  analysisCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  analysisHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginRight: 8,
  },
  timeText: {
    fontSize: 14,
    color: '#6B7280',
  },
  statusIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  analysisContent: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  analysisImage: {
    width: 80,
    height: 80,
    borderRadius: 12,
    marginRight: 16,
  },
  analysisDetails: {
    flex: 1,
  },
  plantName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  resultText: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8,
  },
  analysisInfo: {
    marginBottom: 8,
  },
  infoItem: {
    flexDirection: 'row',
    marginBottom: 2,
  },
  infoLabel: {
    fontSize: 13,
    color: '#6B7280',
  },
  infoValue: {
    fontSize: 13,
    fontWeight: '500',
    color: '#374151',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    fontSize: 13,
    color: '#9CA3AF',
    marginLeft: 4,
  },
  treatmentStatus: {
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    paddingTop: 12,
  },
  treatedContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  treatedText: {
    fontSize: 14,
    color: '#22C55E',
    fontWeight: '500',
    marginLeft: 8,
  },
  untreatedContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  untreatedText: {
    fontSize: 14,
    color: '#F59E0B',
    fontWeight: '500',
    marginLeft: 8,
  },
  bottomSpacer: {
    height: 20,
  },
});