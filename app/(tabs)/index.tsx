import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import {
  Scan,
  TrendingUp,
  Shield,
  MapPin,
  Calendar,
  ChevronRight,
  Leaf,
  BarChart3,
  Activity,
  CheckCircle,
  AlertTriangle,
  Zap,
} from 'lucide-react-native';
import { router } from 'expo-router';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const recentAnalyses = [
    {
      id: 1,
      plantName: 'Tomate',
      disease: 'Mancha Parda',
      severity: 'Moderada',
      date: 'Hoje, 14:30',
      image: 'https://images.pexels.com/photos/1327838/pexels-photo-1327838.jpeg',
      color: '#F59E0B',
      status: 'warning',
    },
    {
      id: 2,
      plantName: 'Milho',
      disease: 'Planta Saudável',
      severity: 'Baixa',
      date: 'Ontem, 09:15',
      image: 'https://images.pexels.com/photos/547263/pexels-photo-547263.jpeg',
      color: '#059669',
      status: 'healthy',
    },
  ];

  const stats = [
    { label: 'Análises hoje', value: '12', icon: Activity, color: '#059669' },
    { label: 'Taxa de acerto', value: '94%', icon: TrendingUp, color: '#10B981' },
    { label: 'Plantas monitoradas', value: '156', icon: Leaf, color: '#065F46' },
    { label: 'Alertas ativos', value: '3', icon: Shield, color: '#DC2626' },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <LinearGradient
        colors={['#065F46', '#047857']}
        style={styles.header}>
        <View style={styles.headerContent}>
          <View style={styles.headerText}>
            <Text style={styles.greeting}>Olá, Agricultor!</Text>
            <Text style={styles.subtitle}>Monitore suas plantas com IA</Text>
          </View>
          <View style={styles.locationContainer}>
            <MapPin size={16} color="#FFFFFF" />
            <Text style={styles.location}>Sorocaba, SP</Text>
          </View>
        </View>
      </LinearGradient>

      {/* White Content Section */}
      <View style={styles.content}>
        {/* Main Action Section - Now properly in white area */}
        <View style={styles.mainActionSection}>
          <Text style={styles.sectionTitle}>Diagnóstico Inteligente</Text>
          <Text style={styles.sectionSubtitle}>
            Identifique doenças e deficiências com precisão
          </Text>
          
          <TouchableOpacity
            style={styles.mainActionCard}
            onPress={() => router.push('/(tabs)/scan')}
            activeOpacity={0.9}>
            <LinearGradient
              colors={['#059669', '#047857']}
              style={styles.mainActionGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}>
              
              <View style={styles.actionIconContainer}>
                <Zap size={32} color="#FFFFFF" />
              </View>
              
              <View style={styles.actionContent}>
                <Text style={styles.actionTitle}>Iniciar Diagnóstico</Text>
                <Text style={styles.actionDescription}>
                  Capture ou faça upload de uma imagem da planta
                </Text>
              </View>
              
              <View style={styles.actionArrow}>
                <ChevronRight size={24} color="#FFFFFF" />
              </View>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* Stats Grid */}
        <View style={styles.statsSection}>
          <Text style={styles.sectionTitle}>Estatísticas de Hoje</Text>
          <View style={styles.statsGrid}>
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
        </View>

        {/* Recent Analyses */}
        <View style={styles.recentSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Análises Recentes</Text>
            <TouchableOpacity onPress={() => router.push('/(tabs)/history')}>
              <Text style={styles.viewAll}>Ver todas</Text>
            </TouchableOpacity>
          </View>

          {recentAnalyses.map((analysis) => (
            <TouchableOpacity key={analysis.id} style={styles.analysisCard}>
              <Image source={{ uri: analysis.image }} style={styles.analysisImage} />
              
              <View style={styles.analysisContent}>
                <View style={styles.analysisHeader}>
                  <Text style={styles.plantName}>{analysis.plantName}</Text>
                  <View style={styles.statusIndicator}>
                    {analysis.status === 'healthy' ? (
                      <CheckCircle size={16} color="#059669" />
                    ) : (
                      <AlertTriangle size={16} color="#F59E0B" />
                    )}
                  </View>
                </View>
                
                <Text style={[styles.disease, { color: analysis.color }]}>
                  {analysis.disease}
                </Text>
                
                <View style={styles.analysisFooter}>
                  <Calendar size={14} color="#9CA3AF" />
                  <Text style={styles.analysisDate}>{analysis.date}</Text>
                </View>
              </View>
              
              <ChevronRight size={20} color="#D1D5DB" />
            </TouchableOpacity>
          ))}
        </View>

        {/* Tips Section */}
        <View style={styles.tipsSection}>
          <Text style={styles.sectionTitle}>💡 Dica do Dia</Text>
          <View style={styles.tipCard}>
            <View style={styles.tipIcon}>
              <Shield size={24} color="#059669" />
            </View>
            <View style={styles.tipContent}>
              <Text style={styles.tipTitle}>Prevenção é o melhor remédio</Text>
              <Text style={styles.tipText}>
                Realize inspeções regulares nas suas plantas para detectar problemas
                precocemente e evitar perdas na produção.
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.bottomSpacer} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  headerText: {
    flex: 1,
  },
  greeting: {
    fontSize: 28,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#FFFFFF',
    opacity: 0.9,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  location: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 4,
  },
  content: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 24,
    paddingTop: 32,
  },
  mainActionSection: {
    marginBottom: 40,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#065F46',
    marginBottom: 8,
  },
  sectionSubtitle: {
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 20,
  },
  mainActionCard: {
    borderRadius: 20,
    overflow: 'hidden',
    elevation: 8,
    shadowColor: '#065F46',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
  },
  mainActionGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 24,
    minHeight: 100,
  },
  actionIconContainer: {
    width: 64,
    height: 64,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 20,
  },
  actionContent: {
    flex: 1,
  },
  actionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 6,
  },
  actionDescription: {
    fontSize: 14,
    color: '#FFFFFF',
    opacity: 0.9,
    lineHeight: 20,
  },
  actionArrow: {
    width: 40,
    height: 40,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statsSection: {
    marginBottom: 32,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  statCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    width: (width - 64) / 2,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  statIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  statValue: {
    fontSize: 24,
    fontWeight: '700',
    color: '#065F46',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#64748B',
    textAlign: 'center',
  },
  recentSection: {
    marginBottom: 32,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  viewAll: {
    fontSize: 14,
    color: '#059669',
    fontWeight: '600',
  },
  analysisCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  analysisImage: {
    width: 56,
    height: 56,
    borderRadius: 12,
  },
  analysisContent: {
    flex: 1,
    marginLeft: 16,
  },
  analysisHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  plantName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#065F46',
    flex: 1,
  },
  statusIndicator: {
    marginLeft: 8,
  },
  disease: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8,
  },
  analysisFooter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  analysisDate: {
    fontSize: 12,
    color: '#94A3B8',
    marginLeft: 4,
  },
  tipsSection: {
    marginBottom: 32,
  },
  tipCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  tipIcon: {
    width: 48,
    height: 48,
    backgroundColor: '#059669' + '20',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  tipContent: {
    flex: 1,
  },
  tipTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#065F46',
    marginBottom: 8,
  },
  tipText: {
    fontSize: 14,
    color: '#64748B',
    lineHeight: 20,
  },
  bottomSpacer: {
    height: 32,
  },
});