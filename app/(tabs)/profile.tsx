import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Switch,
  Alert,
} from 'react-native';
import {
  User,
  MapPin,
  Phone,
  Mail,
  Settings,
  Bell,
  Shield,
  HelpCircle,
  LogOut,
  ChevronRight,
  Camera,
  Edit3,
  Smartphone,
  Globe,
  Moon,
  Download,
} from 'lucide-react-native';

export default function ProfileScreen() {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [autoSync, setAutoSync] = useState(true);

  const profileData = {
    name: 'João Silva',
    email: 'joao.silva@fazenda.com',
    phone: '+55 (15) 99999-9999',
    location: 'Sorocaba, SP',
    memberSince: 'Janeiro 2024',
    analysisCount: 245,
    accuracy: '94%',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
  };

  const menuSections = [
    {
      title: 'Conta',
      items: [
        {
          icon: Edit3,
          title: 'Editar Perfil',
          subtitle: 'Atualize suas informações pessoais',
          onPress: () => Alert.alert('Funcionalidade', 'Editar perfil em desenvolvimento'),
        },
        {
          icon: Shield,
          title: 'Privacidade e Segurança',
          subtitle: 'Gerencie suas configurações de segurança',
          onPress: () => Alert.alert('Funcionalidade', 'Privacidade em desenvolvimento'),
        },
        {
          icon: Smartphone,
          title: 'Dispositivos Conectados',
          subtitle: 'Veja todos os dispositivos vinculados',
          onPress: () => Alert.alert('Funcionalidade', 'Dispositivos em desenvolvimento'),
        },
      ],
    },
    {
      title: 'Preferências',
      items: [
        {
          icon: Bell,
          title: 'Notificações',
          subtitle: 'Configure alertas e lembretes',
          rightComponent: (
            <Switch
              value={notifications}
              onValueChange={setNotifications}
              trackColor={{ false: '#D1D5DB', true: '#059669' + '40' }}
              thumbColor={notifications ? '#059669' : '#9CA3AF'}
            />
          ),
        },
        {
          icon: Moon,
          title: 'Modo Escuro',
          subtitle: 'Ative o tema escuro',
          rightComponent: (
            <Switch
              value={darkMode}
              onValueChange={setDarkMode}
              trackColor={{ false: '#D1D5DB', true: '#059669' + '40' }}
              thumbColor={darkMode ? '#059669' : '#9CA3AF'}
            />
          ),
        },
        {
          icon: Globe,
          title: 'Sincronização Automática',
          subtitle: 'Sincronize dados automaticamente',
          rightComponent: (
            <Switch
              value={autoSync}
              onValueChange={setAutoSync}
              trackColor={{ false: '#D1D5DB', true: '#059669' + '40' }}
              thumbColor={autoSync ? '#059669' : '#9CA3AF'}
            />
          ),
        },
      ],
    },
    {
      title: 'Suporte',
      items: [
        {
          icon: Download,
          title: 'Exportar Dados',
          subtitle: 'Baixe todas as suas análises',
          onPress: () => Alert.alert('Exportação', 'Iniciando download dos dados...'),
        },
        {
          icon: HelpCircle,
          title: 'Ajuda e Suporte',
          subtitle: 'Encontre respostas para suas dúvidas',
          onPress: () => Alert.alert('Suporte', 'Abrindo central de ajuda...'),
        },
        {
          icon: LogOut,
          title: 'Sair da Conta',
          subtitle: 'Desconecte-se do aplicativo',
          onPress: () => 
            Alert.alert(
              'Sair da Conta',
              'Tem certeza que deseja sair?',
              [
                { text: 'Cancelar', style: 'cancel' },
                { text: 'Sair', style: 'destructive' },
              ]
            ),
          textColor: '#DC2626',
        },
      ],
    },
  ];

  const stats = [
    { label: 'Análises', value: profileData.analysisCount, color: '#059669' },
    { label: 'Precisão', value: profileData.accuracy, color: '#10B981' },
    { label: 'Mês atual', value: '23', color: '#D97706' },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.profileSection}>
          <View style={styles.avatarContainer}>
            <Image source={{ uri: profileData.avatar }} style={styles.avatar} />
            <TouchableOpacity style={styles.cameraButton}>
              <Camera size={16} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
          
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>{profileData.name}</Text>
            <Text style={styles.profileMember}>
              Membro desde {profileData.memberSince}
            </Text>
            
            <View style={styles.contactInfo}>
              <View style={styles.contactItem}>
                <Mail size={14} color="#6B7280" />
                <Text style={styles.contactText}>{profileData.email}</Text>
              </View>
              <View style={styles.contactItem}>
                <Phone size={14} color="#6B7280" />
                <Text style={styles.contactText}>{profileData.phone}</Text>
              </View>
              <View style={styles.contactItem}>
                <MapPin size={14} color="#6B7280" />
                <Text style={styles.contactText}>{profileData.location}</Text>
              </View>
            </View>
          </View>
        </View>
      </View>

      {/* Stats */}
      <View style={styles.statsContainer}>
        {stats.map((stat, index) => (
          <View key={index} style={styles.statCard}>
            <Text style={[styles.statValue, { color: stat.color }]}>
              {stat.value}
            </Text>
            <Text style={styles.statLabel}>{stat.label}</Text>
          </View>
        ))}
      </View>

      {/* Menu Sections */}
      {menuSections.map((section, sectionIndex) => (
        <View key={sectionIndex} style={styles.menuSection}>
          <Text style={styles.sectionTitle}>{section.title}</Text>
          
          {section.items.map((item, itemIndex) => (
            <TouchableOpacity 
              key={itemIndex} 
              style={[
                styles.menuItem,
                itemIndex === section.items.length - 1 && styles.lastMenuItem
              ]}
              onPress={item.onPress}
            >
              <View style={styles.menuItemContent}>
                <View style={[
                  styles.menuIcon,
                  item.textColor && { backgroundColor: item.textColor + '20' }
                ]}>
                  <item.icon 
                    size={20} 
                    color={item.textColor || '#6B7280'} 
                  />
                </View>
                
                <View style={styles.menuTextContainer}>
                  <Text style={[
                    styles.menuItemTitle,
                    item.textColor && { color: item.textColor }
                  ]}>
                    {item.title}
                  </Text>
                  <Text style={styles.menuItemSubtitle}>
                    {item.subtitle}
                  </Text>
                </View>
              </View>
              
              {item.rightComponent || (
                <ChevronRight size={20} color="#D1D5DB" />
              )}
            </TouchableOpacity>
          ))}
        </View>
      ))}

      {/* App Info */}
      <View style={styles.appInfo}>
        <Text style={styles.appVersion}>Agricultura 4.0 - Versão 1.0.0</Text>
        <Text style={styles.appCopyright}>
          © 2025 Facens - Desenvolvimento Mobile
        </Text>
      </View>

      <View style={styles.bottomSpacer} />
    </ScrollView>
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
    paddingBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  profileSection: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    alignItems: 'flex-start',
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 16,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 20,
  },
  cameraButton: {
    position: 'absolute',
    bottom: -4,
    right: -4,
    width: 28,
    height: 28,
    backgroundColor: '#059669',
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: '#FFFFFF',
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 4,
  },
  profileMember: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 16,
  },
  contactInfo: {
    gap: 8,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  contactText: {
    fontSize: 14,
    color: '#374151',
    marginLeft: 8,
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    gap: 16,
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    paddingVertical: 16,
  },
  statValue: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
  },
  menuSection: {
    backgroundColor: '#FFFFFF',
    marginTop: 20,
    marginHorizontal: 20,
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#F9FAFB',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  lastMenuItem: {
    borderBottomWidth: 0,
  },
  menuItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  menuIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  menuTextContainer: {
    flex: 1,
  },
  menuItemTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  menuItemSubtitle: {
    fontSize: 14,
    color: '#6B7280',
  },
  appInfo: {
    paddingHorizontal: 20,
    paddingVertical: 24,
    alignItems: 'center',
  },
  appVersion: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6B7280',
    marginBottom: 4,
  },
  appCopyright: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  bottomSpacer: {
    height: 20,
  },
});